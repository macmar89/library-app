import React from 'react';

import {UserForm} from "../../layout/User/UserForm";
import {useRecoilValue} from "recoil";
import {UserAtom} from "../../global/recoil/UserAtom";

const UserEdit = () => {
  const user = useRecoilValue(UserAtom)

  return (
    <div className='w-full h-full mt-24 flex justify-center items-center'>
      <UserForm title='Upraviť študenta' className='w-1/2 mx-auto' user={user} />
    </div>
  );
};

export default UserEdit
