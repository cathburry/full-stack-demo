import React, { Component, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import Yup from 'yup';
import { updateCategoryEntry, newCategoryEntry, categoryList } from '../../actions/category';
import CustomDatePicker from '../common/CustomDatePicker';
import '../../styles/form.scss';
import { Col, Row } from 'react-bootstrap';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required!'),
  description: Yup.string().required('Description is required!'),
});

const CategoriesForm = (props) => {
  const { mode, row: { _id, title, description }} = props;
  const [redirect, setRedirect] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {}, [props]);

  async function createUpdateRecord(values){
    let results;

    if(props.mode === 'edit') {
      results = await dispatch(updateCategoryEntry(values));
    } else {
      results = await dispatch(newCategoryEntry(values));
    }

    if(results.action.payload.data.response === 'success') {
      setRedirect('success');
      dispatch(categoryList());
    } else {
      setRedirect('failed');
    }
  }

  return (
    <div
      className="form"
      id={mode}
    >
      {
        redirect ? (
          <Row>
            <Col>
              <p>
                {
                  redirect === 'success' ?
                  'Successfully added/updated the category' :
                  'There was an error adding/updating the category'
                }
              </p>
            </Col>
          </Row>
        ) : (
          <Formik
            initialValues={{
              title,
              description,
              id: _id,
            }}
            validationSchema={validationSchema}
            onSubmit={ values => {
              createUpdateRecord(values);
            }}
            render={({ errors, touched }) => (
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
                  <div className={`form-group col-md-12 ${errors.description && touched.description && 'has-error'}`}>
                    <label htmlFor="description">Description</label>
                    <Field
                      name="description"
                      className="form-control"
                      placeholder="Description"
                      type="text"
                    />
                    {
                      errors.description && touched.description && (
                        <span className="help-block">
                          {errors.description}
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

export default CategoriesForm;
