import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import firebase from "./config";
import "firebase/database";
import Header from "./Header";

export default function App() {
  var countTodo = 0;

  var whatToDo = [];

  var whatToDoKey = [];

  const [todo, settodo] = useState("");

  const [error, setError] = useState("");

  var secretKey = firebase.database().ref("/").push().key;

  const addToDo = () => {
    if (todo == "") {
      setError("Enter a value...");
    } else {
      setError("");
      const newToDo = {
        key: secretKey,
        item: todo,
      };
      firebase.database().ref("/").child(secretKey).set(newToDo);

      settodo("");
    }
  };

  const deleteTods = () => {
    firebase.database().ref("/").remove();
    whatToDo = [];
    countTodo = 0;
  };

  firebase
    .database()
    .ref("/")
    .on("child_added", (data) => {
      whatToDo = [...whatToDo, data.val().item];
      whatToDoKey = [...whatToDoKey, data.val().key];
    });

  function deleteOneTodo(firebaseKey, itemKey) {
    firebase.database().ref("/").child(firebaseKey).remove();

    whatToDo.splice(itemKey, 1);
  }

  return (
    <ScrollView>
      <Header />
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
            <View>
              <Text style={styles.errorText}>{error}</Text>
            </View>
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
                  <TouchableOpacity
                    style={styles.todoButton}
                    activeOpacity={0.5}
                    onPress={() => deleteOneTodo(whatToDoKey[key], key)}
                  >
                    <Text style={styles.todoButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    marginRight: 20,
    marginLeft: 20,
    marginTop: 150,
  },
  inputBox: {
    flex: 1,
    justifyContent: "space-around",
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
  errorText: {
    color: "red",
    fontWeight: "900",
  },
});
