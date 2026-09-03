---
layout: home

hero:
  name: "Scytale 프로토콜"
  text: "고성능 Layer-1 블록체인"
  tagline: "120바이트 정규 블록 헤더, CPU 친화적 BLAKE3 PoW, 결정론적 UTXO 상태 루트 및 자율 DNS 시딩."
  actions:
    - theme: brand
      text: 노드 빠른 시작
      link: /ko/getting-started
    - theme: alt
      text: GitHub 저장소
      link: https://github.com/ratufatma/scytale-docs

features:
  - icon: ⚡
    title: "CPU 친화적 BLAKE3 PoW"
    details: "SIMD 병렬 처리에 최적화된 고속 해시 알고리즘으로 ASIC 독점을 방지하고 분산형 탈중앙성을 확보합니다."
  - icon: 🛡️
    title: "120B 표준 헤더 및 상태 루트"
    details: "버전, 이전 해시, 머클 루트 및 utxo_root를 120바이트 고정 바이너리로 바인딩하여 무결성을 강제합니다."
  - icon: 🚀
    title: "Fast Sync 와이어 프로토콜"
    details: "패킷당 최대 2,000개의 UTXO를 청크 단위로 고속 스트리밍 전송하며 동적 메모리 트리 재구성을 지원합니다."
  - icon: ⚖️
    title: "부동소수점 없는 결정론적 수수료"
    details: "정수 사토시 단위만을 사용하여 부동소수점 연산 불일치로 인한 합의 분기 취약점을 원천 차단합니다."
  - icon: 🔑
    title: "기본 Bech32 주소 (scy1...)"
    details: "Ed25519 공개키 서명 및 오류 감지용 6글자 BCH 체크섬을 갖춘 가독성 높은 Bech32 주소 체계."
  - icon: 🌐
    title: "자율형 DNS 시더 (포트 53)"
    details: "서브넷(/24)당 최대 2개 노드 제한 및 Fisher-Yates 무작위 셔플을 제공하는 독립형 DNS 피어 검색 엔진."
---

# Scytale Layer-1 프로토콜 (v0.3.0-devnet)

Scytale Layer-1 블록체인 프로토콜 공식 개발자 문서입니다.
