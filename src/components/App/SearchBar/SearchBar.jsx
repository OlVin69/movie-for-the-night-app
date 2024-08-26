import { Formik, Form, Field } from "formik";
import QuerySchema from "../../../schema";
import s from "./SearchBar.module.css"

const SearchBar = ({ onSearch }) => {
  const handleSubmit = (values, actions) => {
    onSearch(values.query);
    actions.resetForm();
  };
  return (
    <header className={s.header}>
      <Formik initialValues={{ query: "" }}
       onSubmit={handleSubmit}
       validationSchema={QuerySchema}>
        <Form className={s.form}>
          <Field
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button type="submit">Search</button>
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;
