import { functions } from 'firebase-functions'
import { admin } from 'firebase-admin'

// admin.initializeApp()

// exports.createProfile = functions.auth
//   .user()
//   .onCreate((record, context) => {
//     return admin
//       .database()
//       .ref(`/profile/${record.data.uid}`)
//       .set({
//         email: record.data.email
//       })
//   })
