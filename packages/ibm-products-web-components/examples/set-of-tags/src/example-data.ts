/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  TAG_TYPE,
  TAG_SIZE,
} from '@carbon/web-components/es/components/tag/defs';

export interface TagType {
  type: TAG_TYPE;
  text: string;
  size: TAG_SIZE;
  onClose?: () => void; // Made optional to allow exclusion
}

const tagTypes: TAG_TYPE[] = Object.values(TAG_TYPE);

const randomWords =
  'Interface Components Architecture Microservices Tokens Authentication Authorization Encryption Dashboard Metrics Logging Tracing Scalability Latency Containers Virtualization Deployment Infrastructure Cloud Cluster Replica Storage Bandwidth Throughput Streaming Sockets Requests Responses Payload Endpoint GraphQL REST Webhooks JSON Serialization Deserialization Algorithms Inference Model Training Embeddings Prompts Outputs Transformer Neural Optimization Gradient Epoch Dataset Labels Prediction Pipeline Automation Hooks State Context Reducer Props Render Refactor Commit Branch Merge Versioning Build Compile Transpile Minify Bundle Dependency Modules Imports Exports Testing Coverage Snapshot Regression Lint Formatter Error Exception Debug Logs Watcher Server Client Browser Viewport Media Query Responsive Breakpoints Grid CSS Tailwind JavaScript TypeScript Framework Library Routing Navigation SPA SSR Hydration DOM Event Handler Listener Throttle Debounce Asynchronous Callback Promise Await Fetch Resource CORS Header Cookie Session Cache Index Query Database Schema Migration ORM Relation Join Table Record Document NoSQL SQL Function Parameter Return Expression Condition Loop Iteration Variable Constant Scope Closure Arrow Object Array Boolean String Integer Float Null Undefined NaN Prototype Instance Class Constructor Inheritance Encapsulation Abstraction Polymorphism Tokenization CI CD Monitoring Alert Incident SLA SLO Uptime Availability Redundancy Failover Load Balancer Firewall Gateway Certificate TLS HTTPS Domain DNS Proxy Timeout Queue Service Registry Discovery Containerization Kubernetes Docker';

const words: string[] = randomWords.split(/\s+/);

interface GenerateTagsOptions {
  count: number;
  size?: TAG_SIZE;
  dismissible?: boolean;
}

export function generateTags({
  count,
  size = TAG_SIZE.MEDIUM,
  dismissible = false,
}: GenerateTagsOptions): TagData[] {
  return Array.from({ length: count }, (_, index) => {
    const type = tagTypes[index % tagTypes.length];
    const text = words[index % words.length];

    const tag: TagData = {
      type,
      text,
      size,
    };

    if (dismissible) {
      tag.onClose = () => console.log(`Closed tag: ${text}`);
    }

    return tag;
  });
}

// Example usage:
export const tagsData = generateTags({
  count: 100,
  size: TAG_SIZE.SMALL,
  dismissible: true,
});
