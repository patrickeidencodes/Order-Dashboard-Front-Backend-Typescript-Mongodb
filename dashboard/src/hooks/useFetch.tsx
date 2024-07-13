import { useState, useEffect } from 'react';
import axios from 'axios';
import Order from '../order/Order';

interface UseFetchOrdersResult {
    data: Order[];
    loading: boolean;
    error: string | null;
    reFetch: ()=>void;
}

const useFetchOrders = (url: string): UseFetchOrdersResult => {
    console.log(url)
    const [data, setData] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await axios.get(url);
                setData(res.data)
                setLoading(false)
            } catch (err: any) {
                setError(err.message || 'Something went wrong');
                setLoading(false)
            }
        };
        fetchOrders();
    }, [url]);
    const reFetch = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await axios.get(url);
            setData(res.data)
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
        }
        setLoading(false)
    };

    return { data, loading, error, reFetch };
};

export default useFetchOrders;
