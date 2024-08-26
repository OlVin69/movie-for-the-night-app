import * as Yup from "yup" ;

const QuerySchema = Yup.object().shape({
    query: Yup.string().min(2, "Too short").max(50, "Too long").required("Required"),  
})

export default QuerySchema;