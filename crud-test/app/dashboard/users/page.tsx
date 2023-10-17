import axios from '@/lib/axios'
import { DataTable } from './data-table';

export default async function Page() {
  async function getUsers() {
    try {
      const { data } = await axios.get('/testapi/user');
      return data.data;
    } catch (error) {
      console.error('An error occurred while fetching the data:', error);
      return [];
    }
  }
  const users = await getUsers();
  return (
    <div className="bg-white h-full p-8">
      <DataTable data={users} />
    </div>
  )
}
