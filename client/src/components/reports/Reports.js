import { Button, Card, Col, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import { categoryList } from '../../actions/category';
import { expenseList } from '../../actions/expense';
import { getDayMonthYear } from '../../helpers/common';
import { backgroundColors } from '../../constants/colors';

const Reports = () => {
  const dispatch = useDispatch();
  const [monthlyData, setMonthlyData] = useState([]);
  const { categories } = useSelector(state => state.categories);
  const { expense } = useSelector(state => state.expense);
  const [dataSet, setData] = useState({
    datasets: [{
      data: []
    }],
    labels: []
  });


  const dateEnd = new Date();
  const dateStart = new Date().setDate(dateEnd.getDate() - 30);

  useEffect(() => {
    dispatch(categoryList());
    dispatch(expenseList());
  }, []);

  useEffect(() => {}, [dataSet]);

  const getTotalSales = (dStart, dEnd) => {
    if(expense.length > 0) {

      return expense.filter((d) => {
        const nDate = new Date(d.date);
        return dStart <= nDate;
      });
    }
  }

  async function getCategoryData() {
    if(monthlyData && monthlyData.length > 0) {
      var tempData = {
        Uncategorized: 0,
      };
      var tempVals = [];

      const categoryList = await categories.map(function (d) { return d.title; });

      await monthlyData.map((d) => {
        if(categoryList.includes(d.category)) {
          if(tempData[d.category]) {
            tempData[d.category] += d.value;
          } else {
            tempData[d.category] = d.value;
          }
        } else {
          tempData['Uncategorized'] += d.value;
        }
      });
      
      await Object.keys(tempData).map((key) => {
        tempVals.push(tempData[key])
      });

      setData({...{}, ...{
        datasets: [{
          data: tempVals,
          backgroundColor: backgroundColors,
        }],
        labels: Object.keys(tempData)
      }});
    }
  }

  useEffect(() => {
    setMonthlyData(getTotalSales(dateStart, dateEnd));
  }, [categories, expense]);

  useEffect(() => {
    if(monthlyData) {
      getCategoryData();
    }
  }, [monthlyData]);


  return (
    <>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              Monthly Expenses
            </Card.Header>
            <Card.Body>
              <Doughnut data={dataSet} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Reports;