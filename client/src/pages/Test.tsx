import React from 'react';
import {useParams} from "react-router-dom";

const Test = () => {
  const {id2} : {id2: any} = useParams()
console.log(id2)
  return (
    <div>

    </div>
  );
};

export default Test;
