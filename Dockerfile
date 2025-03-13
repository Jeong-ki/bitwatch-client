# 1단계: 빌드 단계
FROM node:23.6.1-alpine AS builder
WORKDIR /app

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

RUN corepack enable && corepack prepare pnpm@10.0.0 --activate

# 빌드 결과물 복사
COPY --from=builder /app ./

# production 환경 설정
ENV NODE_ENV=production

# Next.js 기본 포트 노출 (필요에 따라 변경 가능)
EXPOSE 3000

# Next.js 애플리케이션 실행 (package.json에 정의된 start 스크립트를 사용)
CMD ["pnpm", "start"]
