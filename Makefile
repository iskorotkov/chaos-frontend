VERSION = v0.4.1
IMAGE = iskorotkov/chaos-frontend

.PHONY: ci
ci: build-image push-image deploy

.PHONY: build-image
build-image:
	docker build -f build/frontend.dockerfile -t $(IMAGE):$(VERSION) .

.PHONY: push-image
push-image:
	docker push $(IMAGE):$(VERSION)

.PHONY: deploy
deploy:
	kubectl apply -f deploy/frontend.yaml

.PHONY: undeploy
undeploy:
	kubectl delete -f deploy/frontend.yaml
