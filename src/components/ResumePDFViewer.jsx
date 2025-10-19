import { Document, Page, View, Text } from "@react-pdf/renderer";

const ResumePDF = ({ data }) => (
	<Document>
		<Page size="A4">
			<View>
				<Text>{data.name}</Text>
				<Text>{data.title}</Text>
				<Text>{data.summary}</Text>

				{/* FIX: This defensive check prevents the "data.skills.join is not a function" error.
                  It ensures .join() is only called if data.skills is a true Array.
                  This handles cases where data.skills might be undefined, null, or a single string/object.
                */}
				<Text>
					Skills:{" "}
					{Array.isArray(data.skills)
						? data.skills.join(", ")
						: "Skills data unavailable or incorrectly formatted"}
				</Text>

				{/* Add other sections as needed */}
			</View>
		</Page>
	</Document>
);

export default ResumePDF;
