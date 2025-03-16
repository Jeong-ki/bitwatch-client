# 1단계: 빌드 단계
FROM node:23.6.1-alpine AS builder
WORKDIR /app

# 빌드 시 필요한 환경 변수 정의
# ARG는 "docker build --build-arg" 옵션으로부터 전달받을 수 있습니다.
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_URL
ARG NEXT_PUBLIC_UPBIT_API_URL

# ARG로 받은 값을 실제 ENV로 등록
# (Next.js 빌드 시 process.env.*에서 사용할 수 있게 됨)
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_URL=$NEXT_PUBLIC_URL
ENV NEXT_PUBLIC_UPBIT_API_URL=$NEXT_PUBLIC_UPBIT_API_URL

# Corepack 활성화 후 pnpm v10.0.0 준비
RUN corepack enable && corepack prepare pnpm@10.0.0 --activate

# 의존성 설치를 위해 필요한 파일 복사 (pnpm-lock.yaml 또는 pnpm-lock.json이 있어야 함)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 애플리케이션 소스 전체 복사 및 빌드
COPY . .
RUN pnpm build

# 2단계: 런타임 단계
FROM node:23.6.1-alpine AS runner
WORKDIR /app

# 런타임 단계에서 pnpm 전역 설치
RUN npm install -g pnpm@10.0.0

# 빌드 결과물 복사
COPY --from=builder /app ./

# production 환경 설정
ENV NODE_ENV=production

# Next.js 기본 포트 노출
EXPOSE 3000

# Next.js 애플리케이션 실행 (절대 경로를 사용)
CMD ["/usr/local/bin/pnpm", "start", "-H", "0.0.0.0", "-p", "3000"]
