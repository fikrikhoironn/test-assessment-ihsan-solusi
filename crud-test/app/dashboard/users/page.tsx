import axios from 'axios'
import { DataTable } from './data-table';

export default async function Page() {
  async function getUsers() {
    try {
      const { data } = await axios.get('https://cms-admin-v2.ihsansolusi.co.id/testapi/user', {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTc2MTY3MzksImlhdCI6MTY5NzUzMDMzOSwic3ViIjoyOTd9._RDCUiTtcfjX8MkQm4NV_wTdXNR0Qics-1oaXhSor8c',
        },
      });
      return data.data;
    } catch (error) {
      console.error('An error occurred while fetching the data:', error);
    }
  }
  const users = await getUsers();
  return (
    <div className="bg-white h-full p-8">
      <DataTable data={users} />
    </div>
  )
}
