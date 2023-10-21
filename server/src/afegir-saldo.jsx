import React from "react";
import { useState } from "react";
import {
	Box,
	H3,
	Input,
	Button,
	Table,
	TableCaption,
	Icon,
	TableHead,
	TableRow,
	TableCell,
	CheckBox,
	Link,
	TableBody,
	Text,
} from "@adminjs/design-system";
import axios from "axios";

const MyCustomAction = props => {
	const { record } = props;
	const [correuEntrat, setCorreuEntrat] = useState("");
	const [saldoEntrat, setSaldoEntrat] = useState("");

	return (
		<Box flex>
			<Box
				variant="white"
				width={1}
				style
				boxShadow="card"
				mr="xxl"
				flexShrink={0}
				display="flex"
				flexDirection="column"
				alignItems="center"
			>
				<H3>Afegir saldo</H3>
				<p style={{ marginBottom: "25px" }}>
					Introdueix el nom del client i el saldo a afegir:
				</p>
				<form
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						rowGap: "20px",
					}}
					onSubmit={async e => {
						e.preventDefault();
						(
							await axios.get(
								"http://localhost:8080/admin/api/resources/Usuari/actions/list?filters.username=" +
									correuEntrat
							)
						).data.records.forEach(record => {
							axios
								.post(
									"http://localhost:8080/admin/api/resources/Usuari/records/" +
										record.params._id +
										"/edit",
									{
										saldo:
											parseFloat(record.params.saldo) +
											parseFloat(saldoEntrat),
									}
								)
								.then(() => {
									setSaldoEntrat("");
									setCorreuEntrat("");
								});
						});
					}}
				>
					<Input
						width="200px"
						marginRight={"20px"}
						value={correuEntrat}
						onChange={e => setCorreuEntrat(e.target.value)}
						placeholder="Correu"
						type="email"
					/>
					<Input
						width="200px"
						marginRight={"20px"}
						value={saldoEntrat}
						onChange={e => setSaldoEntrat(e.target.value)}
						placeholder="Saldo a afegir"
						type="number"
						min="1"
						max="50"
						step="0.01"
					/>
					<Button type="submit" variant={"contained"}>
						Acceptar
					</Button>
				</form>
			</Box>
		</Box>
	);
};

export default MyCustomAction;
