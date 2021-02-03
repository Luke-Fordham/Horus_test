import React, { useEffect, useState} from 'react';
import logo from './logo.svg';
import './../App.css';
import TaskList from './TaskList';
import { useBetween } from 'use-between';

const Form: React.FC = () => {
    const useForm = () => {
        const [form, setForm]: any = useState([]);
        return{ form,
        setForm};
    }

    const useSharedForm = () => useBetween(useForm);

    const {form, setForm} = useSharedForm();


  useEffect(()=> {
    const formData: any = [];
    const fetchData: VoidFunction = async () => {
        try{
            const response = await fetch('api/users');
            const users = await response.json();
            formData['users'] = users.users;
        } catch (e) {
            console.log(e);
        }
        try{
            const response = await fetch('api/todos');
            const todos = await response.json();
            formData['todos'] = todos.todos;
        } catch (e) {
            console.log(e);
        }
        setForm(formData);
    }
    fetchData();
    console.log(form);
}, [])

// useEffect(()=> {
//     console.log('recieved change');
// }, [])

  return (
    <div className="form">
        { form.users ? <pre>{JSON.stringify(form.users)}</pre> : null}
        { form.todos ? <pre>{JSON.stringify(form.todos)}</pre>: null }
        <TaskList />
        { form.test ? <pre>{JSON.stringify(form.test)}</pre>: null }
    </div>
  );
}

export default Form;
