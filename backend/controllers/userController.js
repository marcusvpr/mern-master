import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import generator from 'generate-password';
import sendEmailUtil from '../utils/sendEmailUtil.js';
import moment from 'moment';

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
 
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    // Atualização do lastAccess ...
    user.lastAccess = moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + ' ' + 
                                            user.lastAccess.substring(0, 19);
    const userSave = await user.save();

    res.json({
      _id: userSave._id,
      name: userSave.name,
      email: userSave.email,
      role: userSave.role,
      indStatus: userSave.indStatus,
      lastAccess: userSave.lastAccess,
    });
  } else {
    res.status(401);
    throw new Error('Inválido e-mail ou senha');
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('Usuário já existe');
  }

  // Trata perfil ... (default = USER)
  var userRole = '';
  if (role == '' || !role) {
    userRole = 'USER';
  }
  if (role == 'ADMIN' || role == 'USER') {
    userRole = role;
  } else {
    res.status(400);
    throw new Error('Perfil não existe! = {$role}');
  }

  var registerCode = generator.generate({
    length: 5,
    numbers: true
  });
  // 
  var textEmail = '<h2>Controle Condomínio:</h2>' +
                  '<h4>Código de confirmação de E-mail: ' + registerCode + '</h4>';

  sendEmailUtil(res, email, 'Código confirmação E-mail.', textEmail);

  const user = await User.create({
    name,
    email,
    password,
    role,
    indStatus: registerCode,
    lastAccess,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      indStatus: user.indStatus,
      lastAccess: user.lastAccess,
    });
  } else {
    res.status(400);
    throw new Error('Inválido dados usuário');
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Sair realizada com sucesso' });
};

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password').sort({ email: 1 })
  if (users) {
    res.json(users)
  } else {
    res.status(404);
    throw new Error('Não existem Usuários');
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      indStatus: user.indStatus,
      lastAccess: user.lastAccess,
    });
  } else {
    res.status(404);
    throw new Error('Usuário não encontrado');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }
    if (req.body.role) {
      user.role = req.body.role;
    }
    if (req.body.indStatus) {
      user.indStatus = req.body.indStatus;
    }
    if (req.body.lastAccess) {
      user.lastAccess = req.body.lastAccess;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      indStatus: updatedUser.indStatus,
      lastAccess: updatedUser.lastAccess,
    });
  } else {
    res.status(404);
    throw new Error('Usuário não encontrado');
  }
});

// @desc    Patch reset user password
// @route   PATCH /api/users/profile
// @access  Private
const resetUserPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    // 'uEyMTw32v9'
    var newPassword = generator.generate({
      length: 10,
      numbers: true
    });
    // 
    user.password = newPassword;

    const updatedUser = await user.save();
    //
    var textEmail = '<h2>Controle Condomínio:</h2>' +
                    '<h4>Nova Senha gerada: ' + newPassword + '</h4>';

    sendEmailUtil(res, email, 'Recuperação de Senha', textEmail);

    res.status(200).json({ message: 'Foi enviado um e-mail com as instruções '+
                                     'para recuperação da sua Senha.'});
  } else {
    res.status(404);
    throw new Error('E-mail não encontrado');
  }
});

// @desc    Patch reset user password
// @route   PATCH /api/users/profile/email
// @access  Private
const emailConfirmProfile = asyncHandler(async (req, res) => {
  //
  const { email, codeEmail } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    //
    if (codeEmail == 'ReSendEmailCode') {
      var textEmail = '<h2>Controle Condomínio:</h2>' +
        '<h4>Código de confirmação de E-mail: ' + user.indStatus + '</h4>';

      sendEmailUtil(res, email, 'Código confirmação E-mail', textEmail);

      res.status(200).json({ message: 'Código confirmação E-mail reenviado com sucesso'});
    } else {
      if (user.indStatus == codeEmail) {
        //
        user.indStatus = ' ';
  
        const updatedUser = await user.save();
  
        res.status(200).json({ message: 'E-mail validado com sucesso'});
      } else {
        res.status(404);
        throw new Error('Código validação inválido');
      }
    }
    //
  } else {
    res.status(404);
    throw new Error('E-mail não encontrado');
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUsers,
  getUserProfile,
  updateUserProfile,
  resetUserPassword,
  emailConfirmProfile,
};
