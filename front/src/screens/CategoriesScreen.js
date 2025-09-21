import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function CategoriesScreen({ navigation, route }) {
  const [sub_category_id, set_sub_category_id] = useState(null);
 
  const [isCategorySet, setIsCategorySet] = useState(false);


  useEffect(() => {
    if (route.params) {
      const cid = route.params.sub_category_id;
      set_sub_category_id(cid);
      setIsCategorySet(true);

       console.log("effect call");
    }
         // delete(route.params.sub_category_id);
    return () => {
      console.log("clean_up");
      set_sub_category_id(null);
      setIsCategorySet(false)
    }

  })

  return (
    <View style={styles.container_panel}>
      <View style={styles.categories_panel}>
        {isCategorySet && <Text>{sub_category_id}</Text>}

      </View>
      <View style={styles.categories_items_panel}>

      </View>
    </View>
  );
}

export default CategoriesScreen;

const styles = StyleSheet.create({
  container_panel: {
    flex: 1,
    flexDirection: "column",
  },
  categories_panel: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  categories_items_panel: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
});
