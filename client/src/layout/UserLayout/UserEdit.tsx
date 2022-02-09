import React, {useEffect} from 'react';
import {useHistory, useLocation} from "react-router-dom";
import {UserType} from "../../global/types/UserType";
import {UserForm} from "./UserForm";

const EditUser = () => {
  const {
    state,
  }: {
    state: {
      user: UserType;
    };
  } = useLocation();
  const history = useHistory();

  useEffect(() => {}, []);

  if (!state) history.goBack();

  return (
    <div className='w-full h-full mt-24 flex justify-center items-center'>
      <UserForm title='Upraviť užívateľa' className='w-1/2 mx-auto' user={state?.user} />
    </div>
  );
};

export default EditUser;
