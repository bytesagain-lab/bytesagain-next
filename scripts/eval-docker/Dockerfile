# ─── Skill Evaluation Sandbox ───
# Node base gives us a working node/npm, we add strace + clawhub CLI

FROM node:22-alpine

RUN apk add --no-cache \
    strace \
    bash \
    curl \
    jq \
    util-linux \
    procps \
    sudo \
  && npm install -g clawhub \
  && rm -rf /root/.npm /tmp/* /var/cache/apk/* /usr/local/lib/node_modules/.cache

COPY eval.sh /eval.sh
RUN chmod +x /eval.sh

ENTRYPOINT ["/eval.sh"]
