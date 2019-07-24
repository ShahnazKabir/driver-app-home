export const updateObject =(oldObject,updateProperties)=>{

  // console.log("oldObject: ",oldObject);
  // console.log("updateProperties: ",updateProperties);


  return{
    ...oldObject,
    ...updateProperties,
  };
};


// export const updateObject =(oldObject,updateProperties)=>{
//
//   // console.log("oldObject: ",oldObject);
//   // console.log("updateProperties: ",updateProperties);
//
//
//   return{
//     ...oldObject,
//     ...updateProperties,
//   };
// };