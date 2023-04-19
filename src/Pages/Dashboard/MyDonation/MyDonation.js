import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';
import MyDonationRow from './MyDonationRow';
import { motion } from "framer-motion"

const MyDonation = () => {


    const { user } = useContext(AuthContext);

    const url = `http://localhost:5000/donations?email=${user?.email}`;

    const { data: donations = [] } = useQuery({
        queryKey: ['donations', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    // authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })

    return (
        <motion.div initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01]
            }} className=' md:w-9/12 md:mx-auto lg:mx-10 mt-5'>
            <div className="overflow-x-auto">
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Amount</th>
                            <th>Campaign ID</th>
                            <th>Time</th>
                            <th>Campaigner Email</th>
                            <th>TRX_ID</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            donations &&
                            donations?.map((donation, i) => <MyDonationRow key={donation._id} donation={donation} i={i}></MyDonationRow>)

                        }
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default MyDonation;