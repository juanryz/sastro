// GET: Get all members
export default defineEventHandler(async (event) => {
  try {
    // TODO: Connect to MongoDB and fetch members
    // const members = await db.collection('members')
    //   .find({})
    //   .toArray()

    // Mock data
    return [
      {
        _id: '1',
        name: 'Budi Santoso',
        position: 'Ketua',
        bio: 'Pendiri dan ketua organisasi dengan 20+ tahun pengalaman',
        email: 'budi@sastrojendro.id',
        phone: '+62 812 3456 7890'
      },
      {
        _id: '2',
        name: 'Siti Nurhaliza',
        position: 'Wakil Ketua I',
        bio: 'Ahli tari tradisional Jawa dan instruktur bersertifikat',
        email: 'siti@sastrojendro.id',
        phone: '+62 812 3456 7891'
      }
    ]
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching members'
    })
  }
})
