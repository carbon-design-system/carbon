import React from "react";
import { storiesOf } from "@storybook/react";
import Icon from "../Icon";
import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListInput,
  StructuredListCell
} from "../StructuredList";

storiesOf("StructuredList", module)
  .addWithInfo(
    "Simple",
    `
      description here
    `,
    () =>
      <StructuredListWrapper>
        <StructuredListHead>
          <StructuredListRow head>
            <StructuredListCell head>service</StructuredListCell>
            <StructuredListCell head>type</StructuredListCell>
            <StructuredListCell head>description</StructuredListCell>
          </StructuredListRow>
        </StructuredListHead>
        <StructuredListBody>
          <StructuredListRow>
            <StructuredListCell noWrap>
              Apache Spark
            </StructuredListCell>
            <StructuredListCell>IBM</StructuredListCell>
            <StructuredListCell>
              Apache Spark is an open source cluster computing framework
              optimized for
              extremely fast and large scale data processing,
              which you can access via the newly integrated notebook interface
              IBM Analytics
              for Apache Spark.
            </StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell noWrap>
              Cloudant
            </StructuredListCell>
            <StructuredListCell>
              IBM
            </StructuredListCell>
            <StructuredListCell>
              Cloudant NoSQL DB is a fully managed data layer designed for
              modern web and
              mobile applications that leverages a
              flexible JSON schema.
            </StructuredListCell>
          </StructuredListRow>
        </StructuredListBody>
      </StructuredListWrapper>
  )
  .addWithInfo(
    "Selection",
    `
      description here
    `,
    () =>
      <StructuredListWrapper selection border>
        <StructuredListHead>
          <StructuredListRow head>
            <StructuredListCell head>{""}</StructuredListCell>
            <StructuredListCell head>service</StructuredListCell>
            <StructuredListCell head>type</StructuredListCell>
            <StructuredListCell head>description</StructuredListCell>
          </StructuredListRow>
        </StructuredListHead>
        <StructuredListBody>
          <StructuredListRow label htmlFor="apache-spark">
            <StructuredListInput
              id="apache-spark"
              value="apache-spark"
              title="apache-spark"
              name="services"
              defaultChecked
            />
            <StructuredListCell>
              <Icon
                className="bx--structured-list-svg"
                name="checkmark--glyph"
                description="select a service"
              />
            </StructuredListCell>
            <StructuredListCell>
              Apache Spark
            </StructuredListCell>
            <StructuredListCell>IBM</StructuredListCell>
            <StructuredListCell>
              Apache Spark is an open source cluster computing framework
              optimized for
              extremely fast and large scale data processing,
              which you can access via the newly integrated notebook interface
              IBM Analytics
              for Apache Spark.
            </StructuredListCell>
          </StructuredListRow>
          <StructuredListRow label htmlFor="cloudant">
            <StructuredListInput
              id="cloudant"
              value="cloudant"
              title="cloudant"
              name="services"
            />
            <StructuredListCell>
              <Icon
                className="bx--structured-list-svg"
                name="checkmark--glyph"
                description="select a service"
              />
            </StructuredListCell>
            <StructuredListCell>
              Cloudant
            </StructuredListCell>
            <StructuredListCell>
              IBM
            </StructuredListCell>
            <StructuredListCell>
              Cloudant NoSQL DB is a fully managed data layer designed for
              modern web and
              mobile applications that leverages a
              flexible JSON schema.
            </StructuredListCell>
          </StructuredListRow>
        </StructuredListBody>
      </StructuredListWrapper>
  );
