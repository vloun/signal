    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": [
                    "cloudformation:CreateUploadBucket",
                    "cloudformation:EstimateTemplateCost",
                    "cloudformation:ListExports",
                    "cloudformation:ListStacks",
                    "iam:Get*",
                    "iam:List*",
                    "s3:ListAllMyBuckets",
                    "cloudformation:ListImports",
                    "apigateway:*",
                    "lambda:*",
                    "cloudformation:DescribeAccountLimits",
                    "s3:HeadBucket",
                    "cloudformation:ValidateTemplate",
                    "cloudformation:GetTemplateSummary"
                ],
                "Resource": "*"
            },
            {
                "Effect": "Allow",
                "Action": [
                    "cloudformation:*"
                ],
                "Resource": [
                    "arn:aws:cloudformation:*:*:stackset/*:*",
                    "arn:aws:cloudformation:*:*:stack/SignalAPIStack/*",
                ]
            },
            {
                "Effect": "Allow",
                "Action": [
                    "iam:CreateRole",
                    "iam:DeleteRole",
                    "iam:DeleteRolePolicy",
                    "iam:PassRole",
                    "iam:PutRolePolicy"
                ],
                "Resource": [
                    "arn:aws:iam::*:role/SignalAPI*"
                ]
            },
            {
                "Effect": "Allow",
                "Action": [
                    "s3:*"
                ],
                "Resource": [
                    "arn:aws:s3:::YOUR_BUCKET_NAME/*",
                    "arn:aws:s3:::YOUR_BUCKET_NAME"
                ]
            },

        ]
    }
