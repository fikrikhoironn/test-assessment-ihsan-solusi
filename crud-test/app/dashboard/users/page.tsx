import axios from 'axios'
import { DataTable } from './data-table';
import { columns } from "./columns";

export default async function Page() {
  async function getUsers() {
    try {
      const { data } = await axios.get('https://cms-admin-v2.ihsansolusi.co.id/testapi/user', {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTc1MjA0MDcsImlhdCI6MTY5NzQzNDAwNywic3ViIjoyOTd9.aR1960qdf3PFCvMCeEmySEXfl7mY3H6Aj24qmpvnzAE',
        },
      });
      console.log(data.data);
      return data.data;
    } catch (error) {
      console.error('An error occurred while fetching the data:', error);
    }
  }
  const users = await getUsers();
  return (
    <div className="bg-white h-full p-8">
      <DataTable columns={columns} data={users} />
    </div>
  )
}
