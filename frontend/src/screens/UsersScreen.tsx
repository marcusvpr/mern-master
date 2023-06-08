import React, { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import { useQueryUsersMutation } from '../slices/usersApiSlice';

import { useEffectOnce } from '../hooks/UserEffectOnce';

import { toast } from 'react-toastify';
import Loader from '../components/Loader';

import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { User } from '../interfaces/User';

const UsersScreen = () => {

    const dispatch = useDispatch();
    const { userInfo } = useSelector((state: any) => state.auth);

    const [queryUsers, { isLoading }] = useQueryUsersMutation();

    let emptyUser: User = {
        id: '',
        email: '',
        name: '',
        role: '',
    };

    const [users, setUsers] = useState<User[]>([]);
    const [userDialog, setUserDialog] = useState(false);
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [deleteUsersDialog, setDeleteUsersDialog] = useState(false);
    const [user, setUser] = useState<User>(emptyUser);
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState<string>();
    //const dt = useRef<DataTable>(null);

    useEffectOnce(() => {
        loadUsers();
    });

    const loadUsers = async () => {    
        try {
            await queryUsers({}).unwrap().then(userList => setUsers(userList));
        } catch (err) {
            console.log('UsersScreen.loadUsers ..... ( ', err.error);
            //toast.error(err?.data?.message || err.error);
            toast.error(err.error);
        }
    };

    const formatDate = (value) => {
        return value.substring(0, 16).replace('T',' ').replaceAll('-', '/');
    }

    const dateCreatedBodyTemplate = (rowData) => {
        return formatDate(rowData.createdAt);
    }
    const dateUpdatedBodyTemplate = (rowData) => {
        return formatDate(rowData.updatedAt);
    }

    const openNew = () => {
        setUser(emptyUser);
        setSubmitted(false);
        setUserDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setUserDialog(false);
    }

    const hideDeleteUserDialog = () => {
        setDeleteUserDialog(false);
    }

    const hideDeleteUsersDialog = () => {
        setDeleteUsersDialog(false);
    }

    const saveUser = () => {
        setSubmitted(true);

        if (user.name?.trim()) {
            let _users = [...users];
            let _user = {...user};
            if (user.id) {
                const index = findIndexById(user.id);

                _users[index] = _user;
                toast.success('Usuário Alterado');
            }
            else {
                _user.id = createId();
                _users.push(_user);
                toast.success('Usuário Criado');
            }

            setUsers(_users);
            setUserDialog(false);
            setUser(emptyUser);
        }
    }

    const editUser = (user: User) => {
        setUser({...user});
        setUserDialog(true);
    }

    const confirmDeleteUser = (user: User) => {
        setUser(user);
        setDeleteUserDialog(true);
    }

    const deleteUser = () => {
        let _users = users.filter(val => val.id !== user.id);
        setUsers(_users);
        setDeleteUserDialog(false);
        setUser(emptyUser);
        toast.success('Usuário Excluido');
    }

    const findIndexById = (id: string) => {
        let index = -1;
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    const exportCSV = () => {
       // dt.current?.exportCSV({selectionOnly:false});
    }

    const confirmDeleteSelected = () => {
        setDeleteUsersDialog(true);
    }

    const deleteSelectedUsers = () => {
        let _users = users.filter(val => !selectedUsers.includes(val));
        setUsers(_users);
        setDeleteUsersDialog(false);
        setSelectedUsers([]);
        toast.success('Usuários Excluidos');
    }

    const onEmailChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const val = (e.target && e.target.value) || '';
        let _user: User = {...user};
        _user.email = val;

        setUser(_user);
    }

    const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const val = (e.target && e.target.value) || '';
        let _user: User = {...user};
        _user.name = val;

        setUser(_user);
    }

    const onRoleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const val = (e.target && e.target.value) || '';
        let _user: User = {...user};
        _user.role = val;

        setUser(_user);
    }

    const actionBodyTemplate = (rowData: User) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editUser(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteUser(rowData)} />
            </React.Fragment>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:align-items-center justify-content-between">
            <span className="p-input-icon-left w-full md:w-auto">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e: FormEvent<HTMLInputElement>) => setGlobalFilter(e.currentTarget.value)} placeholder="Busca..." className="w-full lg:w-auto" />
            </span>
            <div className="mt-3 md:mt-0 flex justify-content-end">
                <Button icon="pi pi-plus" className="mr-2 p-button-rounded" onClick={openNew} tooltip="New" tooltipOptions={{position: 'bottom'}} />
                <Button icon="pi pi-trash" className="p-button-danger mr-2 p-button-rounded" onClick={confirmDeleteSelected} disabled={!selectedUsers || !selectedUsers.length} tooltip="Delete" tooltipOptions={{position: 'bottom'}} />
                <Button icon="pi pi-upload" className="p-button-help p-button-rounded" onClick={exportCSV} tooltip="Export" tooltipOptions={{position: 'bottom'}} />
            </div>
        </div>
    );
    const userDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveUser} />
        </React.Fragment>
    );

    const deleteUserDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteUserDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteUser} />
        </React.Fragment>
    );

    const deleteUsersDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteUsersDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedUsers} />
        </React.Fragment>
    );

    return (
        <div className="datatable-crud-demo surface-card p-4 border-round shadow-2">

            <div className="text-3xl text-800 font-bold mb-4">Cadastro de Usuários:</div>

            <DataTable value={users} selection={selectedUsers} key="_id"
                dataKey="_id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Mostrando {first} até {last} de {totalRecords} usuários"
                globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                {/*Column field="_id" header="Id:" sortable style={{ minWidth: '12rem' }}></Column}</div>*/}
                <Column field="email" header="E-mail:" sortable style={{ minWidth: '16rem' }}></Column>
                <Column field="name" header="Nome:" sortable style={{ minWidth: '16rem' }}></Column>
                <Column field="role" header="Perfil:" sortable style={{ minWidth: '5rem' }}></Column>
                <Column field="createdAt" header="Dt.Criação:" sortable style={{ minWidth: '11rem' }} 
                                                                    body={dateCreatedBodyTemplate}></Column>
                <Column field="updatedAt" header="Dt.Atualização:" sortable style={{ minWidth: '11rem' }}
                                                                    body={dateUpdatedBodyTemplate}></Column>

                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
            </DataTable>
            
            {isLoading && <Loader />}

            <Dialog visible={userDialog} breakpoints={{'960px': '75vw', '640px': '100vw'}} style={{width: '40vw'}} header="Usuário Detalhes:" modal className="p-fluid" footer={userDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name">Nome:</label>
                    <InputText id="name" value={user.name} onChange={(e) => onNameChange(e)} required autoFocus className={classNames({ 'p-invalid': submitted && !user.name })} />
                    {submitted && !user.name && <small className="p-error">Nome é obrigatório.</small>}
                </div>
                <div className="field">
                    <label htmlFor="email">E-mail:</label>
                    <InputText id="email" value={user.email} onChange={(e) => onNameChange(e)} required autoFocus className={classNames({ 'p-invalid': submitted && !user.email })} />
                    {submitted && !user.email && <small className="p-error">E-mail é obrigatório.</small>}
                </div>
                <div className="field">
                    <label htmlFor="role">Perfil:</label>
                    <InputText id="role" value={user.role} onChange={(e) => onNameChange(e)} required autoFocus className={classNames({ 'p-invalid': submitted && !user.role })} />
                    {submitted && !user.role && <small className="p-error">Perfil é obrigatório.</small>}
                </div>

            </Dialog>

            <Dialog visible={deleteUserDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteUserDialogFooter} onHide={hideDeleteUserDialog}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                    {user && <span>Tem certeza que quer excluir o usuário? <b>{user.email}</b>?</span>}
                </div>
            </Dialog>

            <Dialog visible={deleteUsersDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteUsersDialogFooter} onHide={hideDeleteUsersDialog}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                    {user && <span>Tem certeza que quer excluir os usuários selecionados?</span>}
                </div>
            </Dialog>
        </div>
    );
}

export default UsersScreen;
