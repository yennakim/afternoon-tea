import { deleteSingleTea, getFoodsPairedWithTea, getSingleTea } from './teaData';
import { getSingleFood, deleteSingleFood } from './foodData';

const viewFoodDetails = (foodFirebaseKey) => new Promise((resolve, reject) => {
  getSingleFood(foodFirebaseKey)
    .then((foodObject) => {
      getSingleTea(foodObject.teaId)
        .then((teaObject) => {
          resolve({ teaObject, ...foodObject });
        });
    }).catch((error) => reject(error));
});

const viewTeaDetails = (teaFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleTea(teaFirebaseKey),
    getFoodsPairedWithTea(teaFirebaseKey)])
    .then(([teaObject, FoodsForTeaArray]) => {
      resolve({
        ...teaObject,
        foods:
      FoodsForTeaArray,
      });
    }).catch((error) => reject(error));
});

const deleteFoodTeaRelationship = (teaId) => new Promise((resolve, reject) => {
  getFoodsPairedWithTea(teaId).then((foodsArray) => {
    const deleteFoodPromises = foodsArray.map((food) => deleteSingleFood(food.firebaseKey));

    Promise.all(deleteFoodPromises).then(() => {
      deleteSingleTea(teaId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { viewFoodDetails, viewTeaDetails, deleteFoodTeaRelationship };
