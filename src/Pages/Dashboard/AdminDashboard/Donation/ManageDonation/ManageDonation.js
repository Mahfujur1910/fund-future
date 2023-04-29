import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import { AuthContext } from '../../../../../Context/AuthProvider';
import UserInfoModal from '../../SharedComponent/UserInfoModal';
import Loading from '../../../../Shared/Loading/Loading';

const ManageDonation = () => {

    const { user,donations } = useContext(AuthContext);

    const [search, setSearch] = useState('');
    const [filteredDonations, setFilteredDonations] = useState(donations);
    // const { data: donations = [], refetch,isLoading } = useQuery({
    //     queryKey: ['donations'],
    //     queryFn: async () => {
    //         const res = await fetch('http://localhost:5000/get-donations');
    //         const data = await res.json();
    //         setFilteredDonations(data);
    //         return data;
    //     }
    // })


    useEffect(() => {
        const result = donations.filter((donation) => {
            return donation.donor_mail.toLowerCase().match(search.toLowerCase())
        });
        setFilteredDonations(result);
    }, [search])


    // const handleCampaignStatusUpdate = (id, status) => {

    //     const campaignStatus = {
    //         status: status
    //     }

    //     // console.log(campaignStatus,id)

    //     fetch(`http://localhost:5000/campaign/admin/${id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'content-type': 'application/json',
    //             authorization: `bearer ${localStorage.getItem('accessToken')}`
    //         },
    //         body: JSON.stringify(campaignStatus)
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.modifiedCount > 0) {
    //                 toast.success('Campaign Status updated successfully.')
    //                 refetch();
    //             }else{
    //             toast.error("Failed to update campaign status.")

    //             }
    //         })
    //         .catch(err => {
    //             toast.error(err.message)
    //             console.error(err)
    //         });
    // }



    // console.log(filteredCampaigns);






    const columns = [

        {
            name: 'DONOR MAIL',
            // selector: row => row._id,
            cell: (row) => <label htmlFor="userInfo" data-tip="Contact" className="tooltip tooltip-accent  ">{row.donor_mail}</label>,
            sortable: true
        },
        {
            name: 'TRX',
            selector: row => row.transactionId,
            sortable: true
        },
        {
            name: 'TIME',
            selector: row => row.time,
            sortable: true
        },
        {
            name: 'CAMPAIGN ID',
            selector: row => <div>{row.donation_type === 'charity' ? <p className=''>{row.charity_id}</p> : <p className=''>{row.campaign_id}</p> }</div>,
            sortable: true

        },        {
            name: 'CAMPAIGN NAME',
            selector: row => row.name,
            cell: (row) => <div>{row.donation_type === 'charity' ? <p className='font-semibold'>{row.charity_name}</p> : <p className='font-semibold'>{row.campaign_name}</p>  }</div>
        },

    ]
    const conditionalRowStyles = [
        {
          when: row => row.donation_type === 'charity',
          style: {
            backgroundColor: '#C3EFD3',
          },
        },
        {
          when: row => row.donation_type === '',
          style: {backgroundColor: '#C3EFD3',},
        }
      ];


    // if (isLoading) {
    //     return <Loading></Loading>
    // }

    return (
        <div className='w-11/12 mx-auto bg-neutral p-5 rounded-md'>
            <DataTable
                conditionalRowStyles={conditionalRowStyles}
                columns={columns}
                data={filteredDonations}
                pagination
                fixedHeader
                fixedHeaderScrollHeight='450px'
                selectableRows
                selectableRowsHighlight
                subHeader
                subHeaderComponent={
                    <input className='px-4 py-2 my-10 border-2 w-1/2 border-neutral bg-neutral rounded-full' type='text' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search here by email'></input>
                }
                subHeaderAlign='right'
            >

            </DataTable>

            {/* <UserInfoModal></UserInfoModal> */}
        </div>
    );
};

export default ManageDonation;