import Order from "../models/order.js";
import Product from "../models/products.js";
import { isAdmin, isCustomer } from "./userController.js";

export async function createOrder(req, res) {
  // check login as customer

  if (!isCustomer) {
    res.json({
      message: "Please login as a customer to create orders",
    });
  }
  //take latest product id

  try {
    const latestOrder = await Order.find().sort({ date: -1 }).limit(1);

    let orderId;

    if (latestOrder.length == 0) {
      orderId = "CBC0001";
    } else {
      const currentOrderId = latestOrder[0].orderId;

      const numberString = currentOrderId.replace("CBC", "");

      const number = parseInt(numberString);

      const newNumber = (number + 1).toString().padStart(4, "0");

      orderId = "CBC" + newNumber;
    }

    const newOrderData = req.body;

    const newProductArray = [];

    for (let i = 0; i < newOrderData.orderedItems.length; i++) {
      const product = await Product.findOne({
        productId: newOrderData.orderedItems[i].productId,
      });

      if (product == null) {
        res.json({
          message:
            "Product with id  " +
            newOrderData.orderedItems[i].productId +
            "not found",
        });

        return;
      }

      newProductArray[i] = {
        name: product.productName,
        price: product.lastPrice,
        productId:product.productId,
        quantity: newOrderData.orderedItems[i].qty,
        image: product.Images[0],
      };
    }

    newOrderData.orderedItems = newProductArray;

    newOrderData.orderId = orderId;
    newOrderData.email = req.user.email;

    const order = new Order(newOrderData);

    const savedOrder = await order.save();
    console.log(savedOrder)
    res.json({
      message: "Order Created..! ",
      order: savedOrder
    });
   
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: error.message,
    });
  }
}




export async function getOrders(req, res) {
  try {
    if(isCustomer(req)){

        const orders = await Order.find({ email: req.user.email });
        res.json(orders);
        return;

    }else if(isAdmin(req)){
        const orders = await Order.find({});

        res.json(orders);
        return;
    }else{
        res.json({
            message: "Please login to view orders"
        })
    }
   
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}






export async function getQuote(req, res) {
  try {
    const newOrderData = req.body;

    const newProductArray = [];

    let total = 0;
    let labeledTotal = 0;

    for (let i = 0; i < newOrderData.orderedItems.length; i++) {
      const product = await Product.findOne({
        productId: newOrderData.orderedItems[i].productId,
      });

      if (product == null) {
        res.json({
          message:
            "Product with id " +
            newOrderData.orderedItems[i].productId +
            " not found",
        });
        return;
      }
      labeledTotal += product.price * newOrderData.orderedItems[i].qty;
      total += product.lastPrice * newOrderData.orderedItems[i].qty;
      newProductArray[i] = {
        name: product.productName,
        price: product.lastPrice,
        labeledPrice: product.price,
        quantity: newOrderData.orderedItems[i].qty,
        image: product.Images[0],
      };
    }
    console.log(newProductArray);
    newOrderData.orderedItems = newProductArray;
    newOrderData.total = total;

    res.json({
      orderedItems: newProductArray,
      total: total,
      labeledTotal: labeledTotal,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}


export async function updateOrder(req, res) {
  if (!isAdmin(req)) {
   return res.json({
      message: "Please login as admin to update orders",
    });
  }
  
  try {
    const orderId = req.params.orderId;

    const order = await Order.findOne({
      orderId: orderId,
    });

    if (order == null) {
     return res.status(404).json({
        message: "Order not found",
      });
    }

    const notes = req.body.notes;
    const status = req.body.status;

    const updateOrder = await Order.findOneAndUpdate(
      { orderId: orderId },
      { notes: notes, status: status }
    );

    res.json({
      message: "Order updated",
      updateOrder: updateOrder
    });

  }catch(error){

    
    res.status(500).json({
      message: error.message,
    });
  }
}