import { useEffect, useState } from 'react';
import { useDispatch} from 'react-redux';
import { employeeSlice } from '../store/employee.slice';
import { additionalDataSlice } from '../store/additionalData.slice';
import { useAppSelector } from '../store/store';
// import 'bootstrap/dist/css/bootstrap.min.css';




const Employees_tree = () => {

    type SubdivRole = [number, number];
    const [loading, setLoading] = useState(false);
    const [isShowSubdivisions, setShowSubdivisions] = useState(false);
    const [showedRoles, setShowedRoles] = useState<number[]>([]);
    const [showedEmployees, setShowedEmployees] = useState<SubdivRole[]>([]);
    const employees = useAppSelector(employeeSlice.selectors.selectAllEmployees);
    const subdivisions = useAppSelector(additionalDataSlice.selectors.selectSubdivision);
    const roles = useAppSelector(additionalDataSlice.selectors.selectRole);
    const dispatch = useDispatch();

    async function fetchEmployees() {
    setLoading(true);
    const response = await fetch("http://localhost:8000/api/v1/employee-data/");
    const employeeList = await response.json();
    console.log(employeeList);
    // console.log(updateDevice);
    dispatch(employeeSlice.actions.storeEmployee({ employee: employeeList }));
    setLoading(false);
    }

    async function fetchAdditionalData() {
    // setLoading(true);
    const response = await fetch("http://localhost:8000/api/v1/subdiv-role-data/");
    const additionalDataList = await response.json();
    // console.log(additionalDataList);
    // console.log(updateDevice);
    dispatch(additionalDataSlice.actions.storeSubdivision({ subdivision: additionalDataList.subdivisions }));
    dispatch(additionalDataSlice.actions.storeRole({ role: additionalDataList.roles }));
    // setLoading(false);
    }

    useEffect(() => {
    fetchEmployees();
    fetchAdditionalData();
    }, []);

    function addOpenedRoles(id: number) {
        if (showedRoles.includes(id)) {
            setShowedRoles(showedRoles.filter(role => role !== id));
        } else {
            setShowedRoles([...showedRoles, id]);
        }
    }

    function addOpenedEmployees(id1: number, id2: number) {
        if (showedEmployees.filter(sublist => sublist.includes(id1) && sublist.includes(id2)).length > 0) {
            setShowedEmployees(showedEmployees.filter(sublist => !(sublist.includes(id1) && sublist.includes(id2))));
        } else {
            setShowedEmployees([...showedEmployees, [id1, id2]]);
        }
        console.log(showedEmployees);
    }
    // console.log(employee);
    // console.log(Object.values(subdivisions));

    return (
        <div className='ml-10'>
           <h1 onClick={() => setShowSubdivisions(!isShowSubdivisions)} className='mt-10 ml-2'>Employees</h1>
           {loading && <p className='ml-2'>Loading...</p>}
           {isShowSubdivisions && Object.values(subdivisions).map((subdiv) => (
            <div key={subdiv.id} id={String(subdiv.id)} className=''>
                <h3 onClick={() => addOpenedRoles(subdiv.id)} className='ml-[30px] mt-2 mb-2'>{subdiv.subdiv_name} </h3>
                {showedRoles.includes(subdiv.id) && Object.values(roles).map((role) => (
                    <div key={role.id} id={String(role.id)} onClick={() => addOpenedEmployees(subdiv.id, role.id)} className='ml-[60px] mt-2 mb-2'>
                        <p >{role.role_name}</p>
                        {showedEmployees.filter(sublist => sublist.includes(subdiv.id) && sublist.includes(role.id)).length > 0 && Object.values(employees).filter((employee) => employee.subdivision_id === subdiv.id && employee.role_id === role.id).map((employee) => (
                            <div key={employee.id} id={String(employee.id)} className='mb-2 mt-2 ml-[30px]'>
                                <p>{employee.full_name}</p>
                                <p>Зарплата: {employee.salary} руб.</p>
                                <p>Нанят: {employee.hiring_date.slice(0, 10)}</p>
                            </div>

                            
                        ))}
                    </div>
                ))}
            </div>
           ))} 
        </div>
    );
};

export default Employees_tree;

