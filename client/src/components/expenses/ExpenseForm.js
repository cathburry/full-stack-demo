import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import Yup from 'yup';
import { updateExpenseEntry, newExpenseEntry, expenseList } from '../../actions/expense';
import CustomDatePicker from '../common/CustomDatePicker';
import '../../styles/form.scss';
import { Col, Row } from 'react-bootstrap';
import { categoryList } from '../../actions/category';
import CustomDropDown from '../common/CustomDropdown';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required!'),
  category: Yup.string().required('Category is required!'),
  date: Yup.date().required('Date is required!'),
  value: Yup.number().required('Value is required!'),
});

const ExpenseForm = (props) => {
  const { mode, row: { _id, title, category, date, value }} = props;
  const { categories } = useSelector(state => state.categories);
  const [redirect, setRedirect] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(categoryList());
  }, []);

  useEffect(() => {}, [props, categories]);

  async function createUpdateRecord(values){
    let results;
    if(mode === 'edit') {
      results = await dispatch(updateExpenseEntry(values));
    } else {
      results = await dispatch(newExpenseEntry(values));
    }

    if(results.action.payload.data.response === 'success') {
      setRedirect('success');
      dispatch(expenseList());
    } else {
      setRedirect('failed');
    }
  }

  const getCategories = () => {
    return categories.map((category) => {
      return (<option value={category.title}>{category.title}</option>);
    })
  };

  return(
    <div
      className="form"
      id={mode}
    >
      {
        redirect ? (
          <Row>
            <Col>
              <center>
                <p>{
                  redirect === 'success' ?
                  'Successfully added/updated the expense' :
                  'There was an error adding/updating the expense'
                }</p>
              </center>
            </Col>
          </Row>
        ) : (
          <Formik
            initialValues={{
              title,
              category,
              date,
              value,
              id: _id,
            }}
            validationSchema={validationSchema}
            onSubmit={ values => {
              createUpdateRecord(values);
            }}
            render={({ errors, touched, setFieldValue, values }) => (
              <Form>
                <div className="row">
                  <div className={`form-group col-md-12 ${errors.title && touched.title && 'has-error'}`}>
                    <label htmlFor="title">Title</label>
                    <Field
                      name="title"
                      className="form-control"
                      placeholder="Title"
                      type="text"
                    />
                    {
                      errors.title && touched.title && (
                        <span className="help-block">
                          {errors.title}
                        </span>
                      )
                    }
                  </div>
                </div>
                <div className="row">
                  <div className={`form-group col-md-12 ${errors.category && touched.category && 'has-error'}`}>
                    <label htmlFor="category">Category</label>
                      <Field
                        name="category"
                        component="select"
                        className="form-control"
                      >
                        <option value="select_category">Select a category</option>
                        {getCategories()}
                      </Field>
                    {
                      errors.category && touched.category && (
                        <span className="help-block">
                          {errors.category}
                        </span>
                      )
                    }
                  </div>
                </div>
                <div className="row">
                  <div className={`form-group col-md-6 col-sm-12 ${errors.date && touched.date && 'has-error'}`}>
                    <label htmlFor="date">Date</label>
                    <CustomDatePicker
                      name="date"
                      value={values.date}
                      onChange={setFieldValue}
                      className="form-control"
                      placeholder="Date"
                    />
                    {
                      errors.date && touched.date && (
                        <span className="help-block">
                          {errors.date}
                        </span>
                      )
                    }
                  </div>
                  <div className={`form-group col-md-6 col-sm-12 ${errors.value && touched.value && 'has-error'}`}>
                    <label htmlFor="value">Value ($)</label>
                    <Field
                      name="value"
                      className="form-control"
                      placeholder="Value"
                      type="number"
                    />
                    {
                      errors.value && touched.value && (
                        <span className="help-block">
                          {errors.value}
                        </span>
                      )
                    }
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </div>
                </div>
              </Form>
            )}
          />
        )
      }
    </div>
  );
}

export default ExpenseForm;