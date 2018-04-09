// router.get('/signin', (req, res) => {
//   let [username, password] = getCred(req, res);
//   User.findOne({
//     username: username
//   })
//     .then(user => {
//       return user.comparePass(password)
//         .then(results => {
    
    
//           console.log('RESULTS! ', results);
//           if (!results) {
//             return res.status(401);
//           }
//           User.findOne({
//             username: username
//           }).then((results) => {
//             console.log('results: ', results._id)
//             // console.log('id: ', User._id )
//             Song.findOne({
//               userId: results._id
//             })
//               .then((results) => {
//                 console.log('findone');
//                 console.log(results);
//                 delete results.password;
//                 res.send(results);
//               });
//           });
    
    
//         }).catch((err) => {
//           res.status(401);
//           console.log(err);
//         });
//     });
// });


//all this was in signin route