// GET: Organization structure
export default defineEventHandler(async (event) => {
  try {
    // TODO: Connect to MongoDB and fetch organization structure
    // const structure = await db.collection('organization-structure')
    //   .findOne({ _id: 'main' })

    // Mock data
    return {
      ketua: {
        name: 'Budi Santoso',
        title: 'Ketua',
        email: 'ketua@sastrojendro.id'
      },
      wakil: [
        {
          _id: '1',
          name: 'Siti Nurhaliza',
          title: 'Wakil Ketua I',
          email: 'wakil1@sastrojendro.id'
        },
        {
          _id: '2',
          name: 'Ahmad Wijaya',
          title: 'Wakil Ketua II',
          email: 'wakil2@sastrojendro.id'
        }
      ],
      departments: [
        {
          _id: '1',
          name: 'Departemen Seni',
          members: [
            { _id: '1', name: 'Dewi Lestari', position: 'Ketua Departemen' },
            { _id: '2', name: 'Roni Hermawan', position: 'Koordinator Wayang' }
          ]
        }
      ]
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching organization structure'
    })
  }
})
