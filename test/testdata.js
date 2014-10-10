define(function (require) {
	return {
			nodeData: {
				Name: "Employees"
			},
			children: [
				{
					nodeData: {
						Location: "Asia"
					},
					children: [
						{
							nodeData: {
								Location: "China"
							},
							children: [
								{
									nodeData: {
										Name: "Shanghai",
										Department: "Operations",
									},
									children: [
										{
											nodeData: {
												Name: "Jason Chan",
												Title: "Manager",
												Salary: 80000
											}
										},
										{
											nodeData: {
												Name: "Randy Savage",
												Title: "Security",
												Salary: 40000
											}
										},
										{
											nodeData: {
												Name: "Marcus Reid",
												Title: "Intern",
												Salary: 0
											}
										},
										{
											nodeData: {
												Name: "Shelly Bossom",
												Title: "Receptionist",
												Salary: 50000
											}
										}
									]
								},
								{
									nodeData: {
										Name: "Hong Kong",
										Department: "Sales",
									},
									children: [
										{
											nodeData: {
												Name: "Gregory Inglis",
												Title: "Sales Team Leader",
												Salary: 200000
											}
										},
										{
											nodeData: {
												Name: "Jason Taylor",
												Title: "Sales Assistant",
												Salary: 70000
											}
										},
										{
											nodeData: {
												Name: "Simon Mannering",
												Title: "Intern",
												Salary: 0
											}
										},
										{
											nodeData: {
												Name: "Michael Fry-White",
												Title: "Receptionist",
												Salary: 55000
											}
										}
									]
								}
							]
						}
					]
				},
				{
					nodeData: {
						Location: "Europe"
					},
					children: [
						{
							nodeData: {
								Name: "Latvia",
								Department: "Production",
							},
							children: [
								{
									nodeData: {
										Name: "Boris Sheiko",
										Title: "Disgruntled Labourer",
										Salary: 20000
									}
								},
								{
									nodeData: {
										Name: "Michel Bostok",
										Title: "Potato Peeler",
										Salary: 5000
									}
								}
							]
						}
					]
				}
			]
		};
});