FROM golang:1.8-alpine
WORKDIR /go/src/github.com/loadtest/loadapi
EXPOSE 80
CMD loadapi
COPY . ./
RUN go install
