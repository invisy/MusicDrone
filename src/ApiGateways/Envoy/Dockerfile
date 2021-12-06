FROM envoyproxy/envoy-dev:0ab3cfe82a7fed78316929e7225fe17f6791707f AS base
COPY ApiGateways/Envoy/envoy.yaml /etc/envoy/envoy.yaml
RUN chmod go+r /etc/envoy/envoy.yaml
