import React, { useContext, useState } from 'react';
import { format } from 'date-fns';
import Order from './Order';
import './OrderForm.css';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

interface OrderFormProps {
  order: Order;
  onSave: (order: Order) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ order, onSave }) => {
  const [formProdukt, setFormProdukt] = useState(order.produkt);
  const [formNotizen, setFormNotizen] = useState(order.notizen);
  const [formDateien, setFormDateien] = useState<File[]>(order.dateien);
  const [formLink, setFormLink] = useState(order.link);
  const [formDeadline, setFormDeadline] = useState(format(order.deadline, "yyyy-MM-dd'T'HH:mm"));
  const { user } = useContext(AuthContext)
  const [linkError, setLinkError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      const acceptedFiles = selectedFiles.filter(file => 
        file.type.startsWith('image/') || file.type === 'application/pdf'
      );
      setFormDateien(acceptedFiles);
    }
  };

  const validateLink = (link: string) => {
    const pattern = /^(https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\/\S*)?$/;
    return pattern.test(link);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    console.log('handleSubmit called');

    let validatedLink = formLink;
    if (!/^https?:\/\//i.test(formLink)) {
      validatedLink = 'http://' + formLink;
    }

    if (!validateLink(validatedLink)) {
      setLinkError('Bitte eine gültige URL eingeben');
      console.log('Link validation failed');
      return;
    }
    setLinkError(null);

    console.log('Validated Link:', validatedLink);

    const updatedOrder = new Order(
      order.id,
      new Date(),
      order.kundenNummer,
      formProdukt,
      formNotizen,
      formDateien,
      validatedLink,
      new Date(formDeadline),
      order.status
    );
    onSave(updatedOrder);
    const orderData = {
      product: formProdukt,
      notes: formNotizen,
      dateien: formDateien.map(file => file.name),
      link: formLink,
      deadline: formDeadline,
      knr: user.cnr,
      status: 'entry'
    };
    try {
      const response = await axios.post('http://localhost:8800/api/order', orderData);
      console.log(response.data);
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  return (
    <form className="order-form" onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="produkt">Produkt:</label>
        <select
          id="produkt"
          value={formProdukt}
          onChange={(e) => setFormProdukt(e.target.value)}
        >
          <option value="">Wähle ein Produkt aus</option>
          <option value="Thumbnail">Thumbnail</option>
          <option value="Logo">Logo</option>
        </select>
      </div>
      <div>
        <label htmlFor="notizen">Notizen:</label>
        <textarea
          id="notizen"
          value={formNotizen}
          onChange={(e) => setFormNotizen(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label htmlFor="dateien">Dateien:</label>
        <input
          type="file"
          id="dateien"
          accept="image/png, image/jpeg, application/pdf"
          multiple
          onChange={handleFileChange}
        />
        {formDateien.length > 0 && (
          <div className="file-preview">
            {formDateien.map((file, index) => (
              file.type.startsWith('image/') ? (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index}`}
                  className="file-thumbnail"
                />
              ) : (
                <a key={index} href={URL.createObjectURL(file)} target="_blank" rel="noopener noreferrer">
                  {file.name}
                </a>
              )
            ))}
          </div>
        )}
      </div>
      <div>
        <label htmlFor="link">Link:</label>
        <input
          type="text"
          id="link"
          value={formLink}
          onChange={(e) => setFormLink(e.target.value)}
          required
        />
        {linkError && <p className="error">{linkError}</p>}
      </div>
      <div>
        <label htmlFor="deadline">Deadline:</label>
        <input
          type="datetime-local"
          id="deadline"
          value={formDeadline}
          onChange={(e) => setFormDeadline(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default OrderForm;
