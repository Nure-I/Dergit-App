import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Modal,
} from "react-native";
import colors from "./Colors";
import { AntDesign } from "@expo/vector-icons";
import tempData from "./tempData";
import TodoList from "./components/TodoList";
import AddListModal from "./components/AddListModal";
import { Fire, auth, db } from "./Fire";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	setDoc,
} from "firebase/firestore";

export default function App() {
	const [modalVisible, setModalVisible] = useState(false);
	const [lists, setLists] = useState(tempData);
	const [user, setUser] = useState();

	useEffect(() => {
		async function getUser() {
			onAuthStateChanged(auth, (user) => {
				if (user) {
					setUser(user);
				} else {
					signInAnonymously(auth)
						.then((userCredential) => {
							setUser(userCredential.user);
						})
						.catch((error) => {
							const errorCode = error.code;
							const errorMessage = error.message;
							console.log(errorCode, errorMessage);
						});
				}
			});
			// const todoRef = collection(db, "users");
			// let allTodos = await getDocs(todoRef);
			// console.log(allTodos.f);

			// if (docSnap.exists()) {
			// 	console.log("Document data:", docSnap.data());
			// } else {
			// 	// docSnap.data() will be undefined in this case
			// 	console.log("No such document!");
			// }
		}
		async function getData() {
			const querySnapshot = await getDocs(collection(db, "lists"));
			querySnapshot.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
				console.log(doc.id, " => ", doc.data().lists);
			});
		}
		getUser();
		getData();
	}, []);

	function renderList(list) {
		return <TodoList list={list} updateList={updateList} />;
	}

	function addList(list) {
		setLists([...lists, { ...list, id: lists.length + 1, todos: [] }]);
	}

	function updateList(list) {
		let newlists = lists.map((item) => {
			return item.id === list.id ? list : item;
		});
		setLists(newlists);
	}
	return (
		<View style={styles.container}>
			<Modal
				animationType="slide"
				visible={modalVisible}
				onRequestClose={() => setModalVisible(!modalVisible)}
			>
				<AddListModal setModalVisible={setModalVisible} addList={addList} />
			</Modal>
			<View>
				<Text>{user?.uid}</Text>
			</View>
			<View style={{ flexDirection: "row" }}>
				<View style={styles.divider} />
				<Text style={styles.title}>
					Todo{" "}
					<Text style={{ fontWeight: "300", color: colors.blue }}>List</Text>
				</Text>
				<View style={styles.divider} />
			</View>
			<View style={{ marginVertical: 48 }}>
				<TouchableOpacity
					style={styles.addList}
					onPress={() => setModalVisible(!modalVisible)}
				>
					<AntDesign name="plus" size={16} color={colors.blue} />
				</TouchableOpacity>
				<Text style={styles.add}>Add List</Text>
			</View>
			<View style={{ height: 275, paddingLeft: 32 }}>
				<FlatList
					data={lists}
					keyExtractor={(item) => item.name}
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					keyboardShouldPersistTaps="always"
					renderItem={({ item }) => renderList(item)}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	divider: {
		backgroundColor: colors.lightBlue,
		height: 1,
		flex: 1,
		alignSelf: "center",
	},
	title: {
		fontSize: 38,
		fontWeight: "800",
		color: colors.black,
		paddingHorizontal: 64,
	},
	addList: {
		borderWidth: 2,
		borderColor: colors.lightBlue,
		borderRadius: 4,
		padding: 16,
		alignItems: "center",
		justifyContent: "center",
	},
	add: {
		color: colors.blue,
		fontWeight: "600",
		fontSize: 14,
		marginTop: 8,
	},
});
