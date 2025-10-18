import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
	page: { padding: 28, fontSize: 11, fontFamily: "Helvetica" },
	h1: { fontSize: 18, marginBottom: 8 },
	h2: { fontSize: 13, marginTop: 10, marginBottom: 6 },
	row: { marginBottom: 4 },
});

export default function ResumePDF({ data }) {
	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<Text style={styles.h1}>{data.name}</Text>
				<Text>{data.title}</Text>
				<Text style={styles.h2}>Summary</Text>
				<Text>{data.summary}</Text>
				<Text style={styles.h2}>Experience</Text>
				{data.experience.map((e, i) => (
					<View key={i} style={styles.row}>
						<Text>
							{e.company} — {e.role} ({e.period})
						</Text>
					</View>
				))}
				<Text style={styles.h2}>Skills</Text>
				<Text>{data.skills.join(", ")}</Text>
			</Page>
		</Document>
	);
}
