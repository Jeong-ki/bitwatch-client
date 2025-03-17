# 1단계: 빌드 단계
FROM node:23.6.1-alpine AS builder
WORKDIR /app

# 빌드 시 필요한 환경변수를 ARG로 받음
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_URL
ARG NEXT_PUBLIC_UPBIT_API_URL

# ARG 값을 ENV에 설정하여 빌드 시 사용
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_URL=${NEXT_PUBLIC_URL}
ENV NEXT_PUBLIC_UPBIT_API_URL=${NEXT_PUBLIC_UPBIT_API_URL}

# pnpm 사용을 위한 corepack 활성화 및 pnpm 버전 설정
RUN corepack enable && corepack prepare pnpm@10.0.0 --activate

# 패키지 정보를 먼저 복사해서 캐시 활용
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 전체 소스 복사 후 빌드 수행
COPY . .
RUN pnpm build

# 2단계: 실행 단계 (프로덕션)
FROM node:23.6.1-alpine AS runner
WORKDIR /app

# runner 단계에서도 pnpm 사용을 위해 글로벌 설치 (빌드 환경과 동일한 버전)
RUN npm install -g pnpm@10.0.0

# 빌드 단계에서 생성된 파일 전체 복사
COPY --from=builder /app ./

ENV NODE_ENV=production

# 컨테이너가 외부와 통신할 포트
EXPOSE 3000

# Next.js 애플리케이션 실행 (0.0.0.0으로 바인딩하여 외부 접속 허용)
CMD ["/usr/local/bin/pnpm", "start", "-H", "0.0.0.0", "-p", "3000"]
