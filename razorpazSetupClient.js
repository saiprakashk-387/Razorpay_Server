// import React, {useEffect, useState} from 'react';
// import {
//   ActivityIndicator,
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import axios from 'axios';
// import RazorpayCheckout from 'react-native-razorpay';
// import {RazorpayApiKey} from '../Config';

// const Razorpay = () => {
//   const [product, setProduct] = useState(null);
//   const [paymentProcessing, setPaymentProcessing] = useState(false);

//   const getProducts = async () => {
//     const {data} = await axios.get(
//       `https://fakestoreapi.com/products/${Math.floor(Math.random() * 20)}`,
//     );
//     console.log('data', data);
//     data.price = Math.ceil(data.price) * 100;
//     setProduct(data);
//   };

//   useEffect(() => {
//     getProducts();
//   }, []);
//   const apiNgrokUrl =
//     'https://8114-2409-4072-604-1233-b8ac-cecf-4211-b80f.ngrok-free.app';
//   const apilocalUrl = 'http://192.168.1.100:3000'; ////ip addresss
//   const createOrder = async () => {
//     console.log('yess');
//     const {data} = await axios.post(`${apiNgrokUrl}/createOrder`, {
//       amount: product.price,
//       currency: 'INR',
//     });
//     return data;
//   };

//   const verifyPayment = async (orderID, transaction) => {
//     const {data} = await axios.post(`${apiNgrokUrl}/verifySignature`, {
//       orderID: orderID,
//       transaction: transaction,
//     });
//     return data.validSignature;
//   };

//   const onPay = async () => {
//     console.log('OnPay');
//     setPaymentProcessing(true);
//     const order = await createOrder(); ////payment setup with api for razorpay
//     var options = {
//       name: product.title,
//       image: product.image,
//       description: 'hello',
//       order_id: order.id,
//       key: RazorpayApiKey,
//       prefill: {
//         title: 'useremail@example.com',
//         contact: '9191919191',
//         name: 'John Doe',
//       },
//       theme: {color: '#a29bfe'},
//     };
//     RazorpayCheckout.open(options)
//       .then(async transaction => {
//         const validSignature = await verifyPayment(order.id, transaction);
//         alert('Is Valid Payment: ' + validSignature);
//       })
//       .catch(console.log);
//     setPaymentProcessing(false);

//     // const options = {  ///dummy payment setup without api for razorpay
//     //   description: 'Payment for your awesome product',
//     //   image: 'https://your-awesome-site.com/your-logo.png',
//     //   currency: 'INR',
//     //   key: RazorpayApiKey,
//     //   amount: product.price,
//     //   //   amount: 5000, // amount in paisa (1 INR = 100 paisa)
//     //   name: 'My App',
//     //   prefill: {
//     //     email: 'customer@example.com',
//     //     contact: '9999999999',
//     //     name: 'Customer Name',
//     //   },
//     //   theme: {color: '#F37254'},
//     // };
//     // RazorpayCheckout.open(options)
//     //   .then(data => {
//     //     // handle success
//     //     console.log(`Payment success: ${data.razorpay_payment_id}`);
//     //   })
//     //   .catch(error => {
//     //     // handle failure
//     //     console.log(`Error: ${error.code} | ${error.description}`);
//     //   });
//   };

//   if (!product) {
//     return (
//       <View style={styles.loadingScreen}>
//         <ActivityIndicator color="#a29bfe" size={60} />
//         <TouchableOpacity style={styles.button}>
//           <Text style={styles.buttonText}>Buy</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
//   return (
//     <View style={styles.screen}>
//       <Text style={styles.heading}>Checkout</Text>
//       <Image source={{uri: product.image}} style={styles.image} />
//       <Text style={styles.title}>{product.title}</Text>
//       <Text style={styles.description}>{product.description}</Text>
//       <TouchableOpacity style={styles.button} onPress={onPay}>
//         {paymentProcessing ? (
//           <ActivityIndicator color="white" size={30} />
//         ) : (
//           <Text style={styles.buttonText}>Buy for ₹ {product.price / 100}</Text>
//         )}
//       </TouchableOpacity>
//     </View>
//   );
// };
// export default Razorpay;
// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     width: '100%',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   loadingScreen: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   heading: {
//     marginTop: 50,
//     fontSize: 28,
//     color: '#a29bfe',
//   },
//   image: {
//     height: 100,
//     width: 300,
//     marginTop: 50,
//     borderRadius: 10,
//   },
//   title: {
//     marginTop: 30,
//     fontSize: 22,
//     textAlign: 'center',
//     width: '80%',
//     color: '#a29bfe',
//   },
//   description: {
//     width: '80%',
//     marginTop: 20,
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   button: {
//     width: '80%',
//     backgroundColor: '#a29bfe',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 12,
//     borderRadius: 50,
//     position: 'absolute',
//     bottom: 0,
//     marginBottom: 50,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 20,
//   },
// });
