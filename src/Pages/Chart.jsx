import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../Firebase/Config';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function Chart() {
  const [isLoading, setIsLoading] = useState(false);
  const [dates, setDates] = useState([]); // State to store available dates
  const [selectedDate, setSelectedDate] = useState(''); // State to manage the selected date
  const [attendanceData, setAttendanceData] = useState([]); // State to store fetched attendance data
  const { classNamee } = useParams();

  const [periods, setPeriods] = useState([]); // State to store available periods
  const [selectedPeriod, setSelectedPeriod] = useState('');

  useEffect(() => {
    // Function to fetch dates from Firebase and set them in the state
    const fetchDates = async () => {
      try {
        const datesQuery = await getDocs(
          query(collection(db, 'classes', classNamee, 'chart'), orderBy('period', 'asc'))
        );
        const datesArray = datesQuery.docs.map((doc) => doc.data().date);
        setDates(datesArray);

        // Set the periods to numbers from 1 to 6
        const periodsArray = Array.from({ length: 6 }, (_, index) => (index + 1).toString());
        setPeriods(periodsArray);

        // Set the default date to the first date in the array
        setSelectedPeriod(periodsArray[0]);
        setSelectedDate(datesArray[0]);
      } catch (error) {
        console.error('Error fetching dates:', error);
      }
    };

    fetchDates();
  }, []);

  useEffect(() => {
    // Function to fetch dates and periods from Firebase and set them in the state
    const fetchDatesAndPeriods = async () => {
      try {
        const chartQuery = await getDocs(
          query(collection(db, 'classes', classNamee, 'chart'), where('date', '==', selectedDate), orderBy('period', 'asc'))
        );

        // Fetch and set dates
        const datesArray = chartQuery.docs.map((doc) => doc.data().date);
        setDates(datesArray);
        // Set the default date to the first date in the array
        setSelectedDate(datesArray[0]);

        // Fetch and set periods
        const periodsArray = chartQuery.docs.map((doc) => doc.data().period);
        setPeriods(periodsArray);
        // Set the default period to the first period in the array
        setSelectedPeriod(periodsArray[0]);
      } catch (error) {
        console.error('Error fetching dates and periods:', error);
      }
    };

    fetchDatesAndPeriods();
  }, [selectedDate]);

  useEffect(() => {
    // Function to fetch attendance data based on the selected date and period
    const fetchAttendanceData = async () => {
      setIsLoading(true);
      try {
        const attendanceQuery = await getDocs(
          query(
            collection(db, 'classes', classNamee, 'chart'),
            where('date', '==', selectedDate),
            where('period', '==', selectedPeriod)
          )
        );
        const attendanceDataArray = attendanceQuery.docs.map((doc) => doc.data().list);
        setAttendanceData(attendanceDataArray.flat()); // flatten the array as it's a list of lists
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch attendance data when the selected date or period changes
    if (selectedDate && selectedPeriod) {
      fetchAttendanceData();
    }
  }, [selectedDate, selectedPeriod]);


  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="my-5">
          <Link to={`/en/auth/class/${classNamee}`}><i class="fa-solid fa-arrow-left" style={{fontSize:25,cursor:'pointer'}} ></i></Link>
        </div>
        <h1 className="my-5">{classNamee}</h1>

        {/* Bootstrap Dropdown for selecting dates */}
        <div className="container text-start">
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-secondary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {selectedDate}
            </button>
            <ul className="dropdown-menu">
              {dates.map((date) => (
                <li key={date} onClick={() => setSelectedDate(date)}>
                  <a className="dropdown-item" href="#">
                    {date}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bootstrap Dropdown for selecting periods */}
        <div className="container text-start my-3">
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-secondary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {selectedPeriod || 'Period'}
            </button>
            <ul className="dropdown-menu">
              {periods.map((period) => (
                <li key={period} onClick={() => setSelectedPeriod(period)}>
                  <a className="dropdown-item" href="#">
                    {period}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-top">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <table className="table border table-dark table-striped">
              <thead>
                <tr>
                  <th>roll</th>
                  <th>name</th>
                  <th>mark</th>
                </tr>
              </thead>
              <tbody>
                {
                  attendanceData.map((item, index) => {
                    return (
                      <tr key={item.roll}>
                        <td>{item.roll}</td>
                        <td>{item.name}</td>
                        <td>{item.absent ? <i class="fa-solid fa-xmark" style={{ color: '#ff2600' }} ></i> : <i class="fa-solid fa-check" style={{ color: '#77bb41' }} ></i>}</td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          )}

          <div className="container text-end">
            <button type="button" className="btn btn-danger">
              Download Report
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
// 77bb41
export default Chart;

