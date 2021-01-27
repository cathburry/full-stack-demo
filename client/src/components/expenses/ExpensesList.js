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
import { deleteExpenseEntry, expenseList } from '../../actions/expense';
import CustomButton from '../common/CustomButton';
import CustomModal from '../common/CustomModal';
import ExpenseForm from './ExpenseForm';
import { getDayMonthYear } from '../../helpers/common';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import '../../styles/list.scss';

const newExpense = {
  id: null,
  title: '',
  category: '',
  date: '',
  value: 0,
};

const ExpensesList = (props) => {
  const { expense } = useSelector(state => state.expense);
  const[isOpen, toggleOpen] = useState(false);
  const[mode, setMode] = useState('');
  const[currData, setCurrData] = useState({});
  const dispatch = useDispatch();

  const toggleModal = () => {
    toggleOpen(!isOpen);
  }

  async function getAList() {
    await dispatch(expenseList());
  }

  useEffect(() => {}, [expense, currData, mode]);

  useEffect(() => {
    getAList();
  }, []);

  async function confirmDelete(e) {
     if (window.confirm('Are you sure you wish to delete this item?')) {
        let results = await dispatch(deleteExpenseEntry(e.target.id));

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
    if( Object.keys(expense).length > 0 ) {
      const row = expense.map( ( item, i ) => {
        return (
          <Tr key={i}>
            <Td>{item.title}</Td>
            <Td>{item.category}</Td>
            <Td>{getDayMonthYear(item.date)}</Td>
            <Td>{item.value}</Td>
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
              <Th scope="col">Category</Th>
              <Th scope="col">Date</Th>
              <Th scope="col">Value</Th>
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
              <h4>Expenses</h4>
            </Col>
            <Col className="add-button" width="50%">
              <CustomButton
                label="Add Expense"
                variant="info"
                onClick={() => triggerAction('add', newExpense)}
              />
              <CustomModal
                handleClose={toggleModal}
                show={isOpen}
                size="lg"
                modalHeading="Add New Expense"
              >
                <ExpenseForm
                  row={currData}
                  mode={mode}
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

export default ExpensesList;