import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td
} from 'react-super-responsive-table'
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategoryEntry, categoryList } from '../../actions/category';
import CustomButton from '../common/CustomButton';
import CustomModal from '../common/CustomModal';
import CategoriesForm from './CategoriesForm';
import { getDayMonthYear } from '../../helpers/common';

import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import '../../styles/list.scss';

const newCategory = {
  id: null,
  title: '',
  description: '',
};

const CategoriesList = (props) => {
  const { categories } = useSelector(state => state.categories);
  const[isOpen, toggleOpen] = useState(false);
  const[mode, setMode] = useState('');
  const[currData, setCurrData] = useState({});
  const dispatch = useDispatch();

  const toggleModal = () => {
    toggleOpen(!isOpen);
  }

  async function getAList() {
    await dispatch(categoryList());
  }

  useEffect(() => {}, [categories, currData, mode]);

  useEffect(() => {
    getAList();
  }, []);

  async function confirmDelete(e) {
     if (window.confirm('Are you sure you wish to delete this item?')) {
        let results = await dispatch(deleteCategoryEntry(e.target.id));

        if(results.action.payload.data.response === 'success') {
          getAList();
        }
     }
   }

  const triggerAction = (action, data) => {
    toggleModal();
    setMode(action);
    setCurrData({...{}, ...data});
  }

  const displayAList = () => {
    if( Object.keys(categories).length > 0 ) {
      const row = categories.map( ( item, i ) => {
        return (
          <Tr key={i}>
            <Td>{item.title}</Td>
            <Td>{item.description}</Td>
            <Td>
              <CustomButton
                id={item._id}
                label="Edit"
                variant="warning"
                size="sm"
                onClick={() => triggerAction('edit', item)}
              />
              &nbsp;
              <CustomButton
                id={item._id}
                label="Delete"
                variant="danger"
                size="sm"
                onClick={confirmDelete}
              />
            </Td>
          </Tr>
        );
      });

      return (
        <Table>
          <Thead>
            <Tr>
              <Th scope="col">Title</Th>
              <Th scope="col">Description</Th>
              <Th scope="col">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            { row }
          </Tbody>
        </Table>
      );
    } else {
      return (
        <p>
          <em>There are no listings at the moment.</em>
        </p>
      );
    }
  }

  return (
    <Container className="list">
      <Row className="justify-content-md-center">
        <Col xs md="12" lg="12">
          <Row className="header">
            <Col width="50%">
              <h4>Categories</h4>
            </Col>
            <Col className="add-button" width="50%">
              <CustomButton
                label="Add Category"
                variant="info"
                onClick={() => triggerAction('add', newCategory)}
              />
              <CustomModal
                handleClose={toggleModal}
                show={isOpen}
                size="lg"
                modalHeading={`${mode === 'add' ? 'Add New' : 'Edit'} Category`}
              >
                <CategoriesForm
                  mode={mode}
                  row={currData}
                  closeModal={toggleModal}
                />
              </CustomModal>
            </Col>
          </Row>
          { displayAList() }
        </Col>
      </Row>
    </Container>
  );
}

export default CategoriesList;