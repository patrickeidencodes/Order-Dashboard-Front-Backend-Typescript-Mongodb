import React, { useState, useEffect, useContext } from 'react';
import './UserPage.css';
import Order from '../order/Order';
import OrderForm from '../order/OrderForm';
import OrderDetails from '../order/OrderDetails';
import useFetchOrders from '../hooks/useFetch';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [newOrder, setNewOrder] = useState<Order | null>(null);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()
    const { data, loading, error } = useFetchOrders("http://localhost:8800/api/order/");
    
    console.log(data, loading, error);

    useEffect(() => {
        // Load orders from the database or API
        const fetchedOrders: Order[] = [];
        if (data != null) {
            data.forEach(entry => {
                if(entry.knr === user.cnr || user.cnr === 1){
                    fetchedOrders.push(new Order(entry._id, entry.date, entry.knr, entry.product, entry.notes, entry.dateien, entry.link, entry.deadline, entry.status));
                }
            });
        }
        setOrders(fetchedOrders);
        console.log(fetchedOrders);
    }, [data, user]); // Update the dependency array to include 'data'

    const handleAddOrder = (order: Order) => {
        setOrders([...orders, order]);
        setShowForm(false);
    };
    const handleButtonClick = async (order:Order, state:string) => {
        const orderData = {
            status: order.status==="entry"?'working':state
        };
        try {
            await axios.put('http://localhost:8800/api/order/'+order.id, orderData);
        } catch (error) {
            console.error('Error saving order:', error);
        }
        navigate("/home")
    };

    return (
        <>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <div className="user-page">
                    {user.cnr === 1 ? <h2>Eingegangene Aufträge</h2> : <h2>Verschickte Aufträge</h2> }
                    <ul>
                        {orders.map(order => {
                            if (order.status === "entry") {
                                return (
                                    <OrderDetails 
                                        key={order.id} 
                                        order={order} 
                                        knr={user.cnr}
                                        handleButtonClick={handleButtonClick}
                                        color='rgb(172, 88, 88)'
                                    />
                                );
                            }
                            return null;
                        })}
                    </ul>
                    <h2>Aufträge in Bearbeitung</h2>
                    <ul>
                        {orders.map(order => {
                            if (order.status === "working") {
                                return (
                                    <OrderDetails 
                                        key={order.id} 
                                        order={order} 
                                        knr={user.cnr}
                                        handleButtonClick={handleButtonClick}
                                        color='rgb(199, 175, 39)'
                                    />
                                );
                            }
                            return null;
                        })}
                    </ul>
                    {user.cnr === 1 ? <h2>Wird vom Kunden überprüft</h2> : <h2>Bist du zufrieden?</h2> }
                    <ul>
                        {orders.map(order => {
                            if (order.status === "check") {
                                return (
                                    <OrderDetails 
                                        key={order.id} 
                                        order={order} 
                                        knr={user.cnr}
                                        handleButtonClick={handleButtonClick}
                                        color='rgb(39, 114, 199)'
                                    />
                                );
                            }
                            return null;
                        })}
                    </ul>
                    <h2>Aufträge in Revision</h2>
                    <ul>
                        {orders.map(order => {
                            if (order.status === "revision") {
                                return (
                                    <OrderDetails 
                                        key={order.id} 
                                        order={order} 
                                        knr={user.cnr}
                                        handleButtonClick={handleButtonClick}
                                        color='rgb(90, 39, 199)'
                                    />
                                );
                            }
                            return null;
                        })}
                    </ul>
                    <h2>Fertige Aufträge</h2>
                    <ul>
                        {orders.map(order => {
                            if (order.status === "done") {
                                return (
                                    <OrderDetails 
                                        key={order.id} 
                                        order={order} 
                                        knr={user.cnr}
                                        handleButtonClick={handleButtonClick}
                                        color='rgb(39, 199, 82)'
                                    />
                                );
                            }
                            return null;
                        })}
                    </ul>
                    {user.cnr > 1 && <button onClick={() => { setShowForm(!showForm); newOrder != null ? newOrder : setNewOrder(new Order(Date.now(), new Date(), 0, '', '', [], '', new Date(), 'entry')); }}>
                        Neuer Auftrag
                    </button>}
                    {showForm && newOrder && <OrderForm order={newOrder} onSave={handleAddOrder} />}
                    {user.cnr === 1 && (
                        <div className="filter-container">
                            <label htmlFor="month-select">Monat:</label>
                            <select id="month-select">
                                Januar
                                Februzar
                            </select>
                        </div>
                    )}
                    
                </div>)
            }
        </>
    );
};

export default UserPage;
