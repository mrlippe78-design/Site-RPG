# ASSET MAP 3.2 — Operação Mundo Vivo

## Resumo

- Pets únicos no catálogo acumulado: **91**.
- Pets com arte WebP dedicada: **25**.
- Pets com fallback SVG determinístico e exclusivo: **66**.
- Localidades com arte WebP dedicada: **18**.
- Imagens WebP de pets e mapas auditadas: **86 arquivos** entre versões hero e thumbnail.
- Arquivos acima de 500 KB: **0**.
- Reutilização de bytes entre artes hero mapeadas: **0 ocorrências**.

A ausência de arte dedicada não reutiliza fotografia de outro pet. A Interface gera um sigilo visual determinístico, derivado do identificador do registro, até existir uma ilustração própria.

## Pets com arte dedicada

- `porteiro-sem-rosto`
- `dama-da-vitrine`
- `vigia-de-telhado`
- `novica-da-lanterna`
- `cronista-do-trovao`
- `vigia-de-ferro`
- `cronista-de-vidro`
- `filha-da-cinza`
- `santo-da-promessa`
- `oraculo-partido`
- `herdeiro-dos-seis-veus`
- `general-da-cicatriz`
- `vazio-que-ri`
- `menina-do-fio-vermelho`
- `mecanico-da-ponte`
- `coveiro-de-luas`
- `violinista-da-chuva`
- `marinheiro-da-ultima-vela`
- `vigia-do-aqueduto`
- `capelao-das-cinzas`
- `duelista-da-pedra-negra`
- `rainha-do-campo-cinzento`
- `arqueira-de-vidro`
- `tecelã-de-brumas`
- `dama-do-ultimo-sino`

## Pets ainda representados por sigilo exclusivo

- `aprendiz-da-nuvem`
- `escriba-sem-tinta`
- `escudeiro-de-lata`
- `andarilha-do-beco`
- `punho-de-bairro`
- `arauto-do-estilingue`
- `ferreiro-das-pontes`
- `corredor-de-cinzas`
- `guardiao-do-cais`
- `monge-de-brasa`
- `cortadora-de-mar`
- `batedor-da-cripta`
- `cavaleiro-da-chuva-cinzenta`
- `rei-das-fendas`
- `matriarca-das-fagulhas`
- `sol-de-batalha`
- `capitao-do-ceu-vermelho`
- `ceifador-da-lua-branca`
- `principe-do-trovao-negro`
- `rato-de-vela`
- `corvo-desafinado`
- `lesma-de-ferro`
- `mimico-de-bolso`
- `sapo-de-cinza`
- `aranha-de-pano`
- `cao-sem-sombra`
- `peixe-de-vidro`
- `besouro-tocador`
- `galo-sepulcral`
- `lobo-de-bruma`
- `raposa-de-cobre`
- `coruja-das-ruinas`
- `javali-de-musgo`
- `gato-de-fuligem`
- `falcao-da-cortina`
- `cervo-de-espinhos`
- `cao-de-oficina`
- `serpente-de-areia`
- `carneiro-de-pedra`
- `mariposa-lunar`
- `lontra-de-cristal`
- `pantera-do-eclipse`
- `urso-sineiro`
- `hiena-carmesim`
- `ibis-do-oraculo`
- `escorpiao-de-bronze`
- `cavalo-de-nevoa`
- `macaco-runico`
- `tartaruga-mar-negro`
- `lince-estelar`
- `abutre-do-pecado`
- `quimera-tres-fomes`
- `cavaleiro-sem-cavaleiro`
- `dragao-de-oficina`
- `dama-do-espelho`
- `leao-ultima-aurora`
- `hidra-de-pantano`
- `fenrir-mil-pegadas`
- `serafim-fraturado`
- `basilisco-livro-carmesim`
- `grifo-sol-partido`
- `leviata-vidro-negro`
- `cervo-primeiro-bosque`
- `cao-vazio-portas`
- `arauto-sete-esferas`
- `crianca-esquecida`

## Localidades com arte dedicada

- `aurevia`
- `noctheryn`
- `porto-millennium`
- `ruinas-de-kael`
- `abismo-frio`
- `floresta-viva`
- `deserto-de-vidro`
- `campos-dos-ossos`
- `jardins-de-carne`
- `mar-de-vidro-negro`
- `cordilheira-dente-branco`
- `pantano-sinos-afogados`
- `pantano-dos-sinos`
- `arena-das-sete-esferas`
- `aldeia-das-folhas-douradas`
- `cruzamento-das-cortinas`
- `sociedade-das-laminas`
- `reino-do-pecado-partido`

## Regras de uso

Cada mapeamento utiliza `imageHero`, `imageThumbnail`, texto alternativo, foco e zoom. Heroes e thumbnails têm caminhos distintos. O carregamento de imagens em cards usa lazy loading, e falhas recebem fallback da categoria em vez de copiar a arte de outro registro.

Relatórios de máquina: `qa/asset-map-3.2.json` e `qa/asset-files-3.2.json`.
