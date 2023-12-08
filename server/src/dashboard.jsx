// import React from "react";
import {
	Box,
	Button,
	H2,
	H5,
	Illustration,
	IllustrationProps,
	Text,
} from "@adminjs/design-system";
import { ApiClient } from "adminjs";
import React, { useEffect, useState } from "react";
import { styled } from "@adminjs/design-system/styled-components";

import { useTranslation } from "adminjs";

const pageHeaderHeight = 284;
const pageHeaderPaddingY = 74;
const pageHeaderPaddingX = 250;

export const DashboardHeader = () => {
	const { translateMessage } = useTranslation();
	return (
		<Box position="relative" overflow="hidden" data-css="default-dashboard">
			<Box position="absolute" top={50} left={-10} opacity={[0.2, 0.4, 1]} animate>
				<Illustration variant="Rocket" />
			</Box>
			<Box position="absolute" top={-70} right={-15} opacity={[0.2, 0.4, 1]} animate>
				<Illustration variant="Moon" />
			</Box>
			<Box
				bg="grey100"
				height={pageHeaderHeight}
				py={pageHeaderPaddingY}
				px={["default", "lg", pageHeaderPaddingX]}
			>
				<Text textAlign="center" color="white">
					<H2>Panell administratiu</H2>
					<Text opacity={0.8}>{translateMessage("welcomeOnBoard_subtitle")}</Text>
				</Text>
			</Box>
		</Box>
	);
};

const boxes = ({ translateMessage }) => [
	{
		variant: "Planet",
		title: "Productes a preparar",
		subtitle: "· 1 entrepà de formatge\n· 2 Entrepans de fuet",
		href: "https://adminjs.co/tutorial-passing-resources.html",
	},
	// {
	// 	variant: "DocumentCheck",
	// 	title: translateMessage("customizeResources_title"),
	// 	subtitle: translateMessage("customizeResources_subtitle"),
	// 	href: "https://adminjs.co/tutorial-customizing-resources.html",
	// },
	// {
	// 	variant: "DocumentSearch",
	// 	title: translateMessage("customizeActions_title"),
	// 	subtitle: translateMessage("customizeActions_subtitle"),
	// 	href: "https://adminjs.co/tutorial-actions.html",
	// },
	// {
	// 	variant: "FlagInCog",
	// 	title: translateMessage("writeOwnComponents_title"),
	// 	subtitle: translateMessage("writeOwnComponents_subtitle"),
	// 	href: "https://adminjs.co/tutorial-writing-react-components.html",
	// },
	// {
	// 	variant: "Folders",
	// 	title: translateMessage("customDashboard_title"),
	// 	subtitle: translateMessage("customDashboard_subtitle"),
	// 	href: "https://adminjs.co/tutorial-custom-dashboard.html",
	// },
	// {
	// 	variant: "Astronaut",
	// 	title: translateMessage("roleBasedAccess_title"),
	// 	subtitle: translateMessage("roleBasedAccess_subtitle"),
	// 	href: "https://adminjs.co/tutorial-rbac.html",
	// },
];

const Card = styled(Box)`
	display: ${({ flex }) => (flex ? "flex" : "block")};
	color: ${({ theme }) => theme.colors.grey100};
	height: 100%;
	text-decoration: none;
	border: 1px solid transparent;
	border-radius: ${({ theme }) => theme.space.md};
	transition: all 0.1s ease-in;
	&:hover {
		border: 1px solid ${({ theme }) => theme.colors.primary100};
		box-shadow: ${({ theme }) => theme.shadows.cardHover};
	}
`;

Card.defaultProps = {
	variant: "container",
	boxShadow: "card",
};

export const Dashboard = () => {
	const [data, setData] = useState({});
	const api = new ApiClient();

	useEffect(() => {
		api.getDashboard()
			.then(response => {
				console.log(response);
				setData(response.data); // { message: 'Hello World' }
			})
			.catch(error => {
				// handle any errors
			});
	}, []);
	const { translateMessage, translateButton } = useTranslation();

	return (
		<Box>
			<DashboardHeader />
			<Box
				mt={["xl", "xl", "-100px"]}
				mb="xl"
				mx={[0, 0, 0, "auto"]}
				px={["default", "lg", "xxl", "0"]}
				position="relative"
				flex
				flexDirection="row"
				flexWrap="wrap"
				width={[1, 1, 1, 1024]}
			>
				{boxes({ translateMessage }).map((box, index) => (
					// eslint-disable-next-line react/no-array-index-key
					<Box key={index} width={[1, 1 / 2, 1 / 2, 1 / 3]} p="lg">
						<Card as="a" href={box.href} target="_blank">
							<Text textAlign="center">
								<Illustration variant={box.variant} width={100} height={70} />
								<H5 mt="lg">{box.title}</H5>
								<table>
									<tr>
										<th>Producte</th>
										<th>Quantitat</th>
										{/* <th>Country</th> */}
									</tr>
									{data.records.map(record => (
										<tr>
											<td>{record.populated.producte.params.nom}</td>
											<td>5</td>
											{/* <td>Germany</td> */}
										</tr>
									))}
								</table>
							</Text>
						</Card>
					</Box>
				))}
				{/* <Box width={[1, 1, 1 / 2]} p="lg">
          <Card
            as="a"
            flex
            href="https://adminjs.page.link/slack"
            target="_blank"
          >
            <Box flexShrink={0}>
              <Illustration variant="SlackLogo" />
            </Box>
            <Box ml="xl">
              <H5>{translateMessage("community_title")}</H5>
              <Text>{translateMessage("community_subtitle")}</Text>
            </Box>
          </Card>
        </Box> */}
				{/* <Box width={[1, 1, 1 / 2]} p="lg">
          <Card
            as="a"
            flex
            href="https://github.com/SoftwareBrothers/adminjs/issues"
            target="_blank"
          >
            <Box flexShrink={0}>
              <Illustration variant="GithubLogo" />
            </Box>
            <Box ml="xl">
              <H5>{translateMessage("foundBug_title")}</H5>
              <Text>{translateMessage("foundBug_subtitle")}</Text>
            </Box>
          </Card>
        </Box> */}
				{/* <Card width={1} m="lg">
          <Text textAlign="center">
            <Illustration variant="AdminJSLogo" />
            <H5>{translateMessage("needMoreSolutions_title")}</H5>
            <Text>{translateMessage("needMoreSolutions_subtitle")}</Text>
            <Text mt="xxl">
              <Button
                as="a"
                variant="contained"
                href="https://share.hsforms.com/1IedvmEz6RH2orhcL6g2UHA8oc5a"
                target="_blank"
              >
                {translateButton("contactUs")}
              </Button>
            </Text>
          </Text>
        </Card> */}
			</Box>
		</Box>
	);
};

export default Dashboard;
