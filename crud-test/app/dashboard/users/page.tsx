`use client`
import axios from 'axios'

export default async function Page() {
  async function getUsers() {
    try {
      const { data } = await axios.get('https://cms-admin-v2.ihsansolusi.co.id/testapi/user', {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTc1MjA0MDcsImlhdCI6MTY5NzQzNDAwNywic3ViIjoyOTd9.aR1960qdf3PFCvMCeEmySEXfl7mY3H6Aj24qmpvnzAE',
        },
      });
      return data;
    } catch (error) {
      console.error('An error occurred while fetching the data:', error);
    }
  }
  const users = await getUsers();
  console.log(users);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-6xl font-bold mt-10">Ihsan Solusi Informatika</h1>
      <h2 className="text-2xl font-bold mt-10">Software House & IT Consultant</h2>
      <h2 className="text-2xl font-bold mt-10">Coding Test</h2>
    </div>
  )
}
