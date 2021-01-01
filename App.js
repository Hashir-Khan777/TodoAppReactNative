import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import firebase from "./config";
import "firebase/database";

export default function App() {
  var countTodo = 0;

  var whatToDo = [];

  const [todo, settodo] = useState("");

  var secretKey = firebase.database().ref("/").push().key;

  const addToDo = () => {
    const newToDo = {
      key: secretKey,
      item: todo,
    };
    firebase.database().ref("/").child(secretKey).set(newToDo);

    settodo("");
  };

  const deleteTods = () => {
    firebase.database().ref("/").remove();
  };

  firebase
    .database()
    .ref("/")
    .on("child_added", (data) => {
      whatToDo = [...whatToDo, data.val().item];
    });

  return (
    <View style={styles.container}>
      <View style={styles.inputAndButtonSction}>
        <View style={styles.inputBox}>
          <TextInput
            keyboardType="default"
            style={styles.input}
            value={todo}
            placeholder="What to do..."
            onChangeText={(e) => settodo(e)}
          />
        </View>

        <View style={styles.buttonSection}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.5}
            onPress={() => addToDo()}
          >
            <Text style={styles.todoButtonText}>Add</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.5}
            onPress={() => deleteTods()}
          >
            <Text style={styles.todoButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.toDosList}>
        {whatToDo.map((value, key) => {
          return (
            <View key={key} style={styles.todoListItem}>
              <Text style={styles.todoItemText}>
                {(countTodo += 1) + ". " + value}
              </Text>

              <View style={styles.todoListItemButtonSection}>
                <TouchableOpacity style={styles.todoButton} activeOpacity={0.5}>
                  <Text style={styles.todoButtonText}>Update</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.todoButton} activeOpacity={0.5}>
                  <Text style={styles.todoButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
    marginRight: 20,
    marginLeft: 20,
  },
  inputBox: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    width: "100%",
    borderBottomColor: "#000",
    borderBottomWidth: 2,
  },
  buttonSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  inputAndButtonSction: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
    paddingBottom: 5,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 4,
  },
  toDosList: {
    marginTop: 30,
  },
  todoListItem: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  todoListItemButtonSection: {
    flexDirection: "row",
  },
  todoButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
    marginLeft: 10,
    paddingBottom: 5,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 4,
  },
  todoButtonText: {
    color: "#fff",
  },
});
