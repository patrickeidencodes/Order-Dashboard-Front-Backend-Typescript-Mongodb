import React from 'react';
import Order from './Order';
import './OrderDetails.css';

interface OrderDetailsProps {
  order: Order;
  color: string;
  knr: number;
  handleButtonClick: (order: Order, state: string) => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order, color, knr, handleButtonClick }) => {
    return (
        <>
            <li className="order-details" style={{ backgroundColor: color }}>
                <p><strong>Datum:</strong> {order.date.toLocaleString()}</p>
                <div className="order-row">
                    <p><strong>Produkt:</strong> {order.produkt}</p>
                    <p><strong>Deadline:</strong> {order.deadline.toLocaleString()}</p>
                </div>
                <div className="order-row">
                    <p><strong>Kunden Nummer:</strong> {order.kundenNummer}</p>
                    <p><strong>Notizen:</strong> {order.notizen}</p>
                </div>
                <p><strong>Link:</strong> <a href={order.link}>{order.link}</a></p>
                <div className="button-row">
                    {knr === 1 && order.status === "entry" && <button onClick={() => handleButtonClick(order, "working")}>Annehmen</button>}
                    {knr === 1 && order.status === "working" && <button onClick={() => handleButtonClick(order, "check")}>Check</button>}
                    {knr === 1 && order.status === "revision" && <button onClick={() => handleButtonClick(order, "book")}>Check</button>}
                    {knr === 1 && order.status === "done" && <button onClick={() => handleButtonClick(order, "check")}>Buchhaltung</button>}
                    {knr > 1 && order.status === "check" && <button onClick={() => handleButtonClick(order, "revision")}>Revision</button>}
                    {knr > 1 && order.status === "check" && <button onClick={() => handleButtonClick(order, "done")}>Annehmen</button>}
                </div>
            </li>
        </>
    );
};

export default OrderDetails;
